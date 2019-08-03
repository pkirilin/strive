import { connect } from "react-redux";
import { tasksActions } from "../../../_actions";
import TaskList from "../TaskList";

const mapStateToProps = state => {
  const {
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

const mapDispatchToProps = dispatch => {
  function loadTasks(requestParams) {
    dispatch(tasksActions.getList(requestParams));
  }

  return {
    loadTasks
  };
};

const TaskListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);

export default TaskListContainer;
