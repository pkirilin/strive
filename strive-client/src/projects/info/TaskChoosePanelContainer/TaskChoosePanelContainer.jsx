import { connect } from "react-redux";
import { tasksActions, taskStatusesActions } from "../../../_actions";
import TaskChoosePanel from "../TaskChoosePanel";

const mapStateToProps = state => {
  const { tasks, chooseAllChecked } = state.tasks.list;
  const { filter } = state.tasks;
  const {
    loadingStatusList,
    taskStatuses,
    failedToFetch: failedToFetchTaskStatuses
  } = state.taskStatuses.list;
  return {
    tasks,
    taskFilterData: filter,
    loadingStatusList,
    taskStatuses,
    failedToFetchTaskStatuses,
    chooseAllChecked
  };
};

const mapDispatchToProps = dispatch => {
  function changeCheckedStatusForTasks(checked) {
    dispatch(tasksActions.checkAll(checked));
  }

  function setStatusForTasks(setStatusData, taskFilterData) {
    dispatch(tasksActions.setStatus(setStatusData))
      .then(() => dispatch(tasksActions.getList(taskFilterData)))
      .then(() =>
        dispatch(taskStatusesActions.getStatusTabs(taskFilterData.projectId))
      );
  }

  return {
    changeCheckedStatusForTasks,
    setStatusForTasks
  };
};

const TaskChoosePanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskChoosePanel);

export default TaskChoosePanelContainer;
