import React from "react";
import {
  PrivateLayout,
  PageTitle,
  MarginedLayout,
  DocumentTitleSetter
} from "../../_components";
import { getResources } from "../../_helpers";
import { ProjectForm } from "../ProjectForm";
import { projectsActions } from "../../_actions";

export class CreateProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.resources = getResources();
  }

  render() {
    let { documentTitles } = this.resources.projects;
    let { titles } = this.resources.projects.create;
    return (
      <DocumentTitleSetter values={[documentTitles.create]}>
        <PrivateLayout>
          <PageTitle>{titles.pageHeader}</PageTitle>
          <MarginedLayout>
            {/* <CreateProjectForm resources={this.resources} /> */}
            <ProjectForm
              resources={this.resources}
              id="createProjectForm"
              loadingText="Creating project"
              submitButtonText="Create"
              projectsAction={projectsActions.create}
            />
          </MarginedLayout>
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
