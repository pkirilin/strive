import React from "react";
import PropTypes from "prop-types";
import { TaskListItem } from "./TaskListItem";

export class TaskList extends React.Component {
  static propTypes = {
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        checked: PropTypes.bool
      })
    ).isRequired
  };

  render() {
    let { tasks } = this.props;

    if (tasks.length === 0) {
      return <div className="text-center text-muted">Task list is empty</div>;
    }

    return (
      <div>
        {tasks.map(task => (
          <TaskListItem key={task.id} data={task} />
        ))}
      </div>
    );
  }
}
