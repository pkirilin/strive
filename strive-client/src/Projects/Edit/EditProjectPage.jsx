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
    projectId = Number(projectId);
    return (
      <DocumentTitleSetter values={["Edit project"]}>
        <PrivateLayout>
          <AppHeader>Edit project</AppHeader>
          {Number.isNaN(projectId) ? (
            <div className="mt-4 mb-4 text-center text-danger">
              Wrong request string: parameter "projectId" is not a number
            </div>
          ) : (
            <ProjectForm
              id="editProjectForm"
              loadingText="Updating project"
              submitButtonText="Save"
              projectsAction={projectsActions.update}
              projectId={projectId}
            />
          )}
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
