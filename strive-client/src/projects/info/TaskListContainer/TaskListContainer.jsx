import { connect } from "react-redux";
import TaskList from "../TaskList";

const mapStateToProps = state => {
  const {
    loadingTasks,
    failedToFetch,
    internalServerError,
    tasks
  } = state.tasks.list;
  return {
    loadingTasks,
    failedToFetch,
    internalServerError,
    tasks
  };
};

const TaskListContainer = connect(mapStateToProps)(TaskList);

export default TaskListContainer;
