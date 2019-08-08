import React, { Component } from "react";
import { ProjectFormContainer } from "../../_shared";

export default class CreateProjectForm extends Component {
  render() {
    return (
      <ProjectFormContainer
        purpose="create"
        id="createProjectForm"
        loadingText="Creating project"
        submitButtonText="Create"
      />
    );
  }
}
