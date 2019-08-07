import { connect } from "react-redux";
import TaskStatusTabsPanel from "../TaskStatusTabsPanel";
import { tasksActions } from "../../../_actions";

const mapStateToProps = state => {
  const {
    loadingStatusTabs,
    statusTabsData,
    internalServerError
  } = state.taskStatuses.tabs;

  const { filter } = state.tasks;

  return {
    loadingStatusTabs,
    statusTabsData,
    internalServerError,
    taskFilterData: filter
  };
};

const mapDispatchToProps = dispatch => {
  function getTasks(requestParams) {
    dispatch(tasksActions.getList(requestParams));
  }

  function updateTaskFilter(filterValues) {
    dispatch(tasksActions.updateFilter(filterValues));
  }

  return {
    getTasks,
    updateTaskFilter
  };
};

const TaskStatusTabsPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskStatusTabsPanel);

export default TaskStatusTabsPanelContainer;
