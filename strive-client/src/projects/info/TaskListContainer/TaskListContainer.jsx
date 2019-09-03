import { connect } from "react-redux";
import TaskList from "../TaskList";

const mapStateToProps = state => {
  const { loadingTasks, taskListError, tasks } = state.tasks.list;

  return {
    loadingTasks,
    taskListError,
    tasks
  };
};

const TaskListContainer = connect(mapStateToProps)(TaskList);

export default TaskListContainer;
