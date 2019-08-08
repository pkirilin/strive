import React from "react";
import { connect } from "react-redux";
import { modalActions, tasksActions } from "../../../_actions";
import { modalConstants } from "../../../_constants";
import TaskActionsDropdown from "../TaskActionsDropdown";

const mapStateToProps = state => {
  let { task } = state.tasks.info;
  return { task };
};

const mapDispatchToProps = dispatch => {
  function openDeleteTaskModal(task) {
    dispatch(
      modalActions.open(modalConstants.DELETE_TASK_OPEN, {
        title: "Delete task confirmation",
        message: (
          <div>
            Delete task <b>{task.title}</b>?
          </div>
        ),
        onClose: () => {
          closeModal();
        },
        onConfirm: () => {
          closeModal();
          dispatch(tasksActions.delete(task));
        }
      })
    );

    const closeModal = () => {
      dispatch(modalActions.close(modalConstants.DELETE_TASK_CLOSE));
    };
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
