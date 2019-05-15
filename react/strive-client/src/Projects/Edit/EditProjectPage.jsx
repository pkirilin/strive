import React from "react";
import {
  PrivateLayout,
  AppHeader,
  DocumentTitleSetter
} from "../../_components";
import { ProjectForm } from "../ProjectForm";
import { projectsActions } from "../../_actions";

export class EditProjectPage extends React.Component {
  render() {
    // Getting projectId for editing from request string
    let { projectId } = this.props.match.params;
    return (
      <DocumentTitleSetter values={["Edit project"]}>
        <PrivateLayout>
          <AppHeader>Edit project</AppHeader>
          <ProjectForm
            id="editProjectForm"
            loadingText="Updating project"
            submitButtonText="Save"
            projectsAction={projectsActions.update}
            projectId={projectId}
          />
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
