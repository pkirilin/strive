import React from "react";
import {
  PrivateLayout,
  PageTitle,
  MarginedLayout,
  DocumentTitleSetter
} from "../../_components";
import { getResources } from "../../_helpers";
import { ProjectsOverviewHeadline } from "./ProjectsOverviewHeadline";
import { ProjectsFilter } from "./ProjectsFilter";
import { ProjectList } from "./ProjectList";

export class ProjectsOverviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.resources = getResources();
  }

  render() {
    let { documentTitles } = this.resources.projects;
    let { titles } = this.resources.projects.create;
    return (
      <DocumentTitleSetter values={[documentTitles.overview]}>
        <PrivateLayout>
          <PageTitle>{titles.pageHeader}</PageTitle>
          <MarginedLayout>
            <ProjectsOverviewHeadline resources={this.resources} />
            <ProjectsFilter resources={this.resources} />
            <ProjectList resources={this.resources} />
          </MarginedLayout>
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
