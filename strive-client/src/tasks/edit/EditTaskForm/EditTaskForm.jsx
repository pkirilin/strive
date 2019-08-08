import React, { Component } from "react";
import { TaskFormContainer } from "../../_shared";

export default class EditTaskForm extends Component {
  render() {
    return (
      <TaskFormContainer
        purpose="update"
        id="updateTaskForm"
        loadingText="Updating task"
        submitButtonText="Save"
      />
    );
  }
}
