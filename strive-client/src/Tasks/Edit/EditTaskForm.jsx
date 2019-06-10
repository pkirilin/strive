import React from "react";
import { TaskForm } from "../TaskForm";

export class EditTaskForm extends React.Component {
  render() {
    return (
      <TaskForm
        purpose="update"
        id="updateTaskForm"
        loadingText="Updating task"
        submitButtonText="Save"
      />
    );
  }
}
