import React from "react";
import PropTypes from "prop-types";
import { TaskFormContainer } from "../_shared";

export class CreateTaskForm extends React.Component {
  static propTypes = {
    projectId: PropTypes.number
  };

  render() {
    return (
      <TaskFormContainer
        purpose="create"
        id="createTaskForm"
        loadingText="Creating task"
        submitButtonText="Create"
        projectId={this.props.projectId}
      />
    );
  }
}
