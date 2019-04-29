import React from "react";
import {
  PrivateLayout,
  PageTitle,
  MarginedLayout,
  DocumentTitleSetter
} from "../../_components";
import { getResources } from "../../_helpers";
import { CreateProjectForm } from "./CreateProjectForm";

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
            <CreateProjectForm resources={this.resources} />
          </MarginedLayout>
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
