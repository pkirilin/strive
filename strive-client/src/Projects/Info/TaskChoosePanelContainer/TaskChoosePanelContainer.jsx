import { connect } from "react-redux";
import { tasksActions, taskStatusesActions } from "../../../_actions";
import TaskChoosePanel from "../TaskChoosePanel";

const mapStateToProps = state => {
  const { tasks } = state.tasksReducer.taskListReducer;
  const { setStatusSuccess } = state.tasksReducer.taskOperationsReducer;
  const { taskFilterReducer } = state.tasksReducer;
  const {
    loadingStatusList,
    taskStatuses,
    failedToFetch: failedToFetchTaskStatuses
  } = state.taskStatusesReducer.taskStatusListReducer;
  return {
    tasks,
    setStatusSuccess,
    taskFilterData: taskFilterReducer,
    loadingStatusList,
    taskStatuses,
    failedToFetchTaskStatuses
  };
};

const mapDispatchToProps = dispatch => {
  function changeCheckedStatusForTasks(checked) {
    dispatch(tasksActions.checkAll(checked));
  }

  function getTasks(requestParams) {
    dispatch(tasksActions.getList(requestParams));
  }

  function getStatusTabs(projectId) {
    dispatch(taskStatusesActions.getStatusTabs(projectId));
  }

  function setStatusForTasks(setStatusData) {
    dispatch(tasksActions.setStatus(setStatusData));
  }

  return {
    changeCheckedStatusForTasks,
    getTasks,
    getStatusTabs,
    setStatusForTasks
  };
};

const TaskChoosePanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskChoosePanel);

export default TaskChoosePanelContainer;
