import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TaskListItem } from "./TaskListItem";
import { AppSpinner } from "../../_components";
import { tasksActions } from "../../_actions";

const mapStateToProps = state => {
  let { loadingTasks, tasks } = state.tasksReducer.taskListReducer;
  return {
    loadingTasks,
    tasks
  };
};

class TaskList extends React.Component {
  static propTypes = {
    projectId: PropTypes.number.isRequired,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        checked: PropTypes.bool
      })
    ).isRequired
  };

  constructor(props) {
    super(props);

    this.props.dispatch(tasksActions.getList(this.props.projectId));
  }

  render() {
    let { loadingTasks, tasks } = this.props;

    if (loadingTasks) {
      return <AppSpinner text="Loading tasks" />;
    }

    if (tasks.length === 0) {
      return <div className="text-center text-muted">Task list is empty</div>;
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
