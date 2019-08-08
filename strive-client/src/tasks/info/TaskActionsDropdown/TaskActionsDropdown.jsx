import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { historyHelper } from "../../../_helpers";
import { AppSectionSeparator } from "../../../_components";

export default class TaskActionsDropdown extends Component {
  static propTypes = {
    taskId: PropTypes.number.isRequired,
    task: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string
    }),
    openDeleteTaskModal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onEditTask = this.onEditTask.bind(this);
    this.onDeleteTask = this.onDeleteTask.bind(this);
  }

  onEditTask() {
    historyHelper.redirectToEditTask(this.props.taskId);
  }

  onDeleteTask() {
    const { task, openDeleteTaskModal } = this.props;
    openDeleteTaskModal(task);
  }

  render() {
    return (
      <AppSectionSeparator>
        <UncontrolledDropdown>
          <DropdownToggle color="light border" caret>
            Actions
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={this.onEditTask}>Edit task</DropdownItem>
            <DropdownItem onClick={this.onDeleteTask}>Delete task</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </AppSectionSeparator>
    );
  }
}
