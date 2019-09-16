import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { tasksActions } from "../../../_actions";
import TaskActionsDropdown from "../TaskActionsDropdown";

const mapStateToProps = state => {
  const { task } = state.tasks.info;
  return { task };
};

const mapDispatchToProps = dispatch => {
  function openDeleteTaskModal(task) {
    toastr.confirm(`Delete task "${task.title}"?`, {
      okText: "Yes",
      cancelText: "No",
      onOk: () => dispatch(tasksActions.delete(task))
    });
  }

  return {
    openDeleteTaskModal
  };
};

const TaskActionsDropdownContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskActionsDropdown);

export default TaskActionsDropdownContainer;
