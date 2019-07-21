import { connect } from "react-redux";
import TaskListItem from "../components/TaskListItem";
import { tasksActions } from "../../../_actions";

const mapDispatchToProps = dispatch => {
  function selectTask(taskId) {
    dispatch(tasksActions.checkTarget(taskId));
  }

  return {
    selectTask
  };
};

const TaskListItemContainer = connect(
  null,
  mapDispatchToProps
)(TaskListItem);

export default TaskListItemContainer;
