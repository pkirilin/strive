import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AppSpinner, TaskStatusBadge } from "../../_components";
import { tasksActions } from "../../_actions";

const mapStateToProps = state => {
  let { gettingTask, task, failedToFetch } = state.tasksReducer.taskInfoReducer;
  return {
    gettingTask,
    task,
    failedToFetch
  };
};

class TaskData extends Component {
  static propTypes = {
    taskId: PropTypes.number.isRequired,

    gettingTask: PropTypes.bool,
    failedToFetch: PropTypes.bool,
    task: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired
      })
    })
  };

  constructor(props) {
    super(props);

    this.props.dispatch(tasksActions.getInfo(this.props.taskId));
  }

  render() {
    let { gettingTask, task, failedToFetch } = this.props;

    // Server is working and some task data was received
    if (task) {
      return (
        <div>
          <div>Name: {task.title}</div>
          <div>Description: {task.description}</div>
          <div>
            Status: <TaskStatusBadge>{task.status.label}</TaskStatusBadge>
          </div>
        </div>
      );
    }

    // Server is not available, showing error message
    if (failedToFetch) {
      return (
        <div className="mt-4 mb-4 text-danger text-center">
          Failed to get task: server is not available
        </div>
      );
    }

    // Showing loading spinner while loading task data from server
    return <div>{gettingTask && <AppSpinner text="Getting task data" />}</div>;
  }
}

const connectedTaskData = connect(mapStateToProps)(TaskData);
export { connectedTaskData as TaskData };
