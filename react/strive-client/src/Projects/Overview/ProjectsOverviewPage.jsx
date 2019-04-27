import React from "react";
import { PrivateLayout, PageTitle, MarginedLayout } from "../../_components";
import { config, getResources } from "../../_helpers";
import { ProjectsOverviewHeadline } from "./ProjectsOverviewHeadline";
import { ProjectsFilter } from "./ProjectsFilter";
import { ProjectList } from "./ProjectList";

export class ProjectsOverviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.resources = getResources();
  }

  componentWillMount() {
    let { documentTitles } = this.resources.projects;
    document.title = `${config.brandName} - ${documentTitles.overview}`;
  }

  render() {
    let { titles } = this.resources.projects.create;
    return (
      <PrivateLayout>
        <PageTitle>{titles.pageHeader}</PageTitle>
        <MarginedLayout>
          <ProjectsOverviewHeadline resources={this.resources} />
          <ProjectsFilter resources={this.resources} />
          <ProjectList resources={this.resources} />
        </MarginedLayout>
      </PrivateLayout>
    );
  }
}
