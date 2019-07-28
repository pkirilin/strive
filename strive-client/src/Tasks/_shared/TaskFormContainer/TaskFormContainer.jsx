import { connect } from "react-redux";
import TaskForm from "../TaskForm/TaskForm";
import { taskStatusesActions, tasksActions } from "../../../_actions";

const mapStateToProps = state => {
  const {
    sendingTaskInfo,
    badRequestResponseJson,
    internalServerError
  } = state.tasksReducer.taskOperationsReducer;
  const {
    gettingTask,
    task,
    notFound,
    failedToFetch
  } = state.tasksReducer.taskInfoReducer;
  const { project } = state.projects.info;
  const { taskStatuses } = state.taskStatusesReducer.taskStatusListReducer;
  return {
    sendingTaskInfo,
    badRequestResponseJson,
    internalServerError,
    gettingTaskForUpdate: gettingTask,
    task,
    project,
    notFoundTaskForUpdate: notFound,
    failedToFetchTaskForUpdate: failedToFetch,
    taskStatuses
  };
};

const mapDispatchToProps = dispatch => {
  function loadTaskStatuses() {
    dispatch(taskStatusesActions.getStatusList());
  }

  function createTask(taskData) {
    dispatch(tasksActions.create(taskData));
  }

  function updateTask(taskData) {
    dispatch(tasksActions.update(taskData));
  }

  return {
    loadTaskStatuses,
    createTask,
    updateTask
  };
};

const TaskFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskForm);

export default TaskFormContainer;
