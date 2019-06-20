import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Nav, NavItem, NavLink, Badge } from "reactstrap";
import { historyHelper } from "../../_helpers";
import { AppSpinner } from "../../_components";
import { tasksActions } from "../../_actions";

const mapStateToProps = state => {
  const {
    loadingStatusTabs,
    statusTabsData,
    internalServerError
  } = state.taskStatusesReducer.taskStatusesInfoReducer;

  const { taskFilterReducer } = state.tasksReducer;

  return {
    loadingStatusTabs,
    statusTabsData,
    internalServerError,
    taskFilterData: taskFilterReducer
  };
};

class TaskStatusTabsPanel extends React.Component {
  static propTypes = {
    projectId: PropTypes.number.isRequired
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
      this.props.dispatch(
        tasksActions.getList({
          ...nextProps.taskFilterData,
          projectId: this.props.projectId
        })
      );
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
        <Nav className="mt-4" tabs>
          {statusTabsData.map(statusTab => (
            <NavItem
              key={statusTab.index}
              onClick={() => {
                this.setState(
                  {
                    activeTabIndex: statusTab.index
                  },
                  () => {
                    this.props.dispatch(
                      tasksActions.updateFilter({
                        status: statusTab.status
                      })
                    );
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
      );
    }

    return <div />;
  }
}

const connectedTaskStatusTabsPanel = connect(mapStateToProps)(
  TaskStatusTabsPanel
);
export { connectedTaskStatusTabsPanel as TaskStatusTabsPanel };
