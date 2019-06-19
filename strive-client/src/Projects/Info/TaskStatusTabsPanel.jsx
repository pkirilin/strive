import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Nav, NavItem, NavLink, Badge } from "reactstrap";
import { historyHelper } from "../../_helpers";
import { AppSpinner } from "../../_components";

const mapStateToProps = state => {
  const {
    loadingStatusTabs,
    statusTabsData,
    internalServerError
  } = state.taskStatusesReducer.taskStatusesInfoReducer;
  return {
    loadingStatusTabs,
    statusTabsData,
    internalServerError
  };
};

class TaskStatusTabsPanel extends React.Component {
  static propTypes = {
    projectId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.createTask = this.createTask.bind(this);
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
      let index = -1;
      return (
        <Nav className="mt-4" tabs>
          {statusTabsData.map(statusTab => (
            <NavItem key={++index}>
              <NavLink className="text-body" href="#" active={false}>
                {statusTab.status}{" "}
                <Badge color="light">{statusTab.countTasks}</Badge>
              </NavLink>
            </NavItem>
          ))}
          <NavItem key={++index}>
            <NavLink className="text-body" href="#" active={true}>
              All{" "}
              <Badge color="light">
                {statusTabsData.reduce(
                  (countTasksSum, statusTab) =>
                    countTasksSum + statusTab.countTasks,
                  0
                )}
              </Badge>
            </NavLink>
          </NavItem>
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
