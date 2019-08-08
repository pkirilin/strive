import { connect } from "react-redux";
import { tasksActions, taskStatusesActions } from "../../../_actions";
import TaskChoosePanel from "../TaskChoosePanel";

const mapStateToProps = state => {
  const { tasks } = state.tasks.list;
  const { setStatusSuccess } = state.tasks.operations;
  const { filter } = state.tasks;
  const {
    loadingStatusList,
    taskStatuses,
    failedToFetch: failedToFetchTaskStatuses
  } = state.taskStatuses.list;
  return {
    tasks,
    setStatusSuccess,
    taskFilterData: filter,
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
