import React, { Component } from "react";
import PropTypes from "prop-types";
import { Nav, NavItem, NavLink, Badge } from "reactstrap";
import { historyHelper } from "../../../_helpers";
import { AppSpinner, AppSectionSeparator } from "../../../_components";

export default class TaskStatusTabsPanel extends Component {
  static propTypes = {
    projectId: PropTypes.number.isRequired,
    getTasks: PropTypes.func.isRequired,
    updateTaskFilter: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.createTask = this.createTask.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Tracks any change of status in filter data
    // If the status was changed, it means that status tab has been clicked
    if (this.props.taskFilterData.status !== nextProps.taskFilterData.status) {
      // Fething new task list with the updated filter
      const { projectId, getTasks } = this.props;
      getTasks({
        ...nextProps.taskFilterData,
        projectId: projectId
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    // Tracking the first fetch, when activeTabIndex is not initialized
    // and statusTabsData was received, so setting last tab ("All") to active by default
    if (this.state.activeTabIndex === undefined && nextProps.statusTabsData) {
      this.setState({
        activeTabIndex: nextProps.statusTabsData.length - 1
      });
    }
    return true;
  }

  createTask() {
    // Each task should belong to its project, so id of a project needs to be "remembered"
    // both for adding a new task and redirecting user back to project info page
    // Id is remembered in browser history state inside this helper method
    historyHelper.redirectToCreateTask(this.props.projectId);
  }

  render() {
    const {
      loadingStatusTabs,
      statusTabsData,
      statusTabsInternalServerError
    } = this.props;

    if (loadingStatusTabs) {
      return <AppSpinner text="Loading status tabs" />;
    }

    if (statusTabsInternalServerError) {
      return (
        <div className="mt-4 mb-4 text-danger text-center">
          Failed to get status tabs: {statusTabsInternalServerError}
        </div>
      );
    }

    if (statusTabsData) {
      return (
        <AppSectionSeparator>
          <Nav tabs>
            {statusTabsData.map(statusTab => (
              <NavItem
                key={statusTab.index}
                onClick={() => {
                  this.setState(
                    {
                      activeTabIndex: statusTab.index
                    },
                    () => {
                      const { updateTaskFilter } = this.props;
                      updateTaskFilter({
                        status: statusTab.status
                      });
                    }
                  );
                }}
              >
                <NavLink
                  className="text-body"
                  href="#"
                  active={this.state.activeTabIndex === statusTab.index}
                >
                  {statusTab.status}{" "}
                  <Badge color="light">{statusTab.countTasks}</Badge>
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </AppSectionSeparator>
      );
    }

    return <div />;
  }
}
