import React from "react";
import { ProjectForm } from "../ProjectForm";

export class CreateProjectForm extends React.Component {
  render() {
    return (
      <ProjectForm
        purpose="create"
        id="createProjectForm"
        loadingText="Creating project"
        submitButtonText="Create"
      />
    );
  }
}
