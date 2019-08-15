import { connect } from "react-redux";
import { tasksActions } from "../../../_actions";
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

  function refreshTasksAfterStatusChanged(filterValues) {
    dispatch(tasksActions.getListWithStatuses(filterValues));
  }

  function setStatusForTasks(setStatusData) {
    dispatch(tasksActions.setStatus(setStatusData));
  }

  return {
    changeCheckedStatusForTasks,
    refreshTasksAfterStatusChanged,
    setStatusForTasks
  };
};

const TaskChoosePanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskChoosePanel);

export default TaskChoosePanelContainer;
