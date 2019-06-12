import React from "react";
import { ProjectForm } from "../ProjectForm";

export class EditProjectForm extends React.Component {
  render() {
    return (
      <ProjectForm
        purpose="update"
        id="editProjectForm"
        loadingText="Updating project"
        submitButtonText="Save"
      />
    );
  }
}
