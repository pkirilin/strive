import React, { Component } from "react";
import PropTypes from "prop-types";
import { Spinner, SectionSeparator } from "../../../_components";
import TaskListItemContainer from "../TaskListItemContainer";

export default class TaskList extends Component {
  static propTypes = {
    loadingTasks: PropTypes.bool,
    taskListError: PropTypes.shape({
      message: PropTypes.string.isRequired
    }),
    projectId: PropTypes.number.isRequired,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        checked: PropTypes.bool
      })
    ).isRequired
  };

  render() {
    const { loadingTasks, taskListError, tasks } = this.props;

    // Rendering loading spinner while data is fetching from server
    if (loadingTasks) {
      return <Spinner text="Loading tasks" />;
    }

    // If any error occured, showing error message
    if (taskListError) {
      return (
        <SectionSeparator>
          <div className="text-center text-danger">{taskListError.message}</div>
        </SectionSeparator>
      );
    }

    if (tasks.length === 0) {
      return (
        <SectionSeparator>
          <div className="text-center text-muted">Task list is empty</div>
        </SectionSeparator>
      );
    }

    // Task's key is not only id because it is nessesary to render and refresh task checkbox checked value
    return (
      <div>
        {tasks.map(task => (
          <TaskListItemContainer
            key={`${task.id}_${task.checked}`}
            data={task}
          />
        ))}
      </div>
    );
  }
}
