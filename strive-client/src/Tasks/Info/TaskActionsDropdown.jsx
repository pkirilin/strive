import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { actionHelper } from "../../_helpers";
import { modalActions, tasksActions } from "../../_actions";
import { modalConstants } from "../../_constants";

const mapStateToProps = state => {
  let { task } = state.tasksReducer.taskInfoReducer;
  return { task };
};

class TaskActionsDropdown extends React.Component {
  static propTypes = {
    taskId: PropTypes.number.isRequired,
    task: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  };

  constructor(props) {
    super(props);

    this.onEditTask = this.onEditTask.bind(this);
    this.onDeleteTask = this.onDeleteTask.bind(this);
  }

  onEditTask() {
    actionHelper.redirectToEditTask(this.props.taskId);
  }

  onDeleteTask() {
    let { task } = this.props;

    this.props.dispatch(
      modalActions.open(modalConstants.DELETE_TASK_OPEN, {
        title: "Delete task confirmation",
        message: (
          <div>
            Delete task <b>{task.name}</b>?
          </div>
        ),
        onClose: () => {
          closeModal();
        },
        onConfirm: () => {
          closeModal();
          this.props.dispatch(tasksActions.delete(task.id));
        }
      })
    );

    const closeModal = () => {
      this.props.dispatch(modalActions.close(modalConstants.DELETE_TASK_CLOSE));
    };
  }

  render() {
    return (
      <UncontrolledDropdown>
        <DropdownToggle color="light border" caret>
          Actions
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.onEditTask}>Edit task</DropdownItem>
          <DropdownItem onClick={this.onDeleteTask}>Delete task</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

const connectedTaskActionsDropdown = connect(mapStateToProps)(
  TaskActionsDropdown
);
export { connectedTaskActionsDropdown as TaskActionsDropdown };
