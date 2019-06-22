import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TaskListItem } from "./TaskListItem";
import { AppSpinner, AppSectionSeparator } from "../../_components";
import { tasksActions } from "../../_actions";

const mapStateToProps = state => {
  let {
    loadingTasks,
    failedToFetch,
    internalServerError,
    tasks
  } = state.tasksReducer.taskListReducer;
  return {
    loadingTasks,
    failedToFetch,
    internalServerError,
    tasks
  };
};

class TaskList extends React.Component {
  static propTypes = {
    loadingTasks: PropTypes.bool,
    failedToFetch: PropTypes.bool,
    internalServerError: PropTypes.bool,
    projectId: PropTypes.number.isRequired,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        checked: PropTypes.bool
      })
    ).isRequired
  };

  constructor(props) {
    super(props);

    const { projectId } = this.props;
    this.props.dispatch(tasksActions.getList({ projectId }));
  }

  render() {
    let {
      loadingTasks,
      failedToFetch,
      internalServerError,
      tasks
    } = this.props;

    // Rendering loading spinner while data is fetching from server
    if (loadingTasks) {
      return <AppSpinner text="Loading tasks" />;
    }

    // Server is not working, then showing a message, that data has not been fetched
    if (failedToFetch) {
      return (
        <div className="text-center text-danger">
          Failed to get tasks: server is not available
        </div>
      );
    }

    // Server is working, but some server-side error occured
    if (internalServerError) {
      return (
        <div className="text-center text-danger">{internalServerError}</div>
      );
    }

    if (tasks.length === 0) {
      return (
        <AppSectionSeparator>
          <div className="text-center text-muted">Task list is empty</div>
        </AppSectionSeparator>
      );
    }

    // Task's key is not only id because it is nessesary to render and refresh task checkbox checked value
    return (
      <div>
        {tasks.map(task => (
          <TaskListItem key={`${task.id}_${task.checked}`} data={task} />
        ))}
      </div>
    );
  }
}

const connectedTaskList = connect(mapStateToProps)(TaskList);
export { connectedTaskList as TaskList };
