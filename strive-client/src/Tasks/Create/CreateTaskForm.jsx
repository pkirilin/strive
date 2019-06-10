import React from "react";
import PropTypes from "prop-types";
import { TaskForm } from "../TaskForm";

export class CreateTaskForm extends React.Component {
  static propTypes = {
    projectId: PropTypes.number
  };

  render() {
    return (
      <TaskForm
        purpose="create"
        id="createTaskForm"
        loadingText="Creating task"
        submitButtonText="Create"
        projectId={this.props.projectId}
      />
    );
  }
}
