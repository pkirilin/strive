import React from "react";
import { TaskFormContainer } from "../_shared";

export class EditTaskForm extends React.Component {
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
