import React from "react";
import {
  PrivateLayout,
  PageTitle,
  MarginedLayout,
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
          <PageTitle>Edit project</PageTitle>
          <MarginedLayout>
            <ProjectForm
              id="editProjectForm"
              loadingText="Updating project"
              submitButtonText="Save"
              projectsAction={projectsActions.update}
              projectId={projectId}
            />
          </MarginedLayout>
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
