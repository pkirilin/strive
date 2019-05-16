import React from "react";
import { projectsActions } from "../../_actions";
import {
  PrivateLayout,
  AppHeader,
  DocumentTitleSetter
} from "../../_components";
import { ProjectForm } from "../ProjectForm";

export class CreateProjectPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter values={["Create project"]}>
        <PrivateLayout>
          <AppHeader>Create project</AppHeader>
          <ProjectForm
            id="createProjectForm"
            loadingText="Creating project"
            submitButtonText="Create"
            projectsAction={projectsActions.create}
          />
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
