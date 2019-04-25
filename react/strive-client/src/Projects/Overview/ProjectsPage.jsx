import React from "react";
import { PrivateLayout, PageTitle, MarginedLayout } from "../../_components";
import { config } from "../../_helpers";
import { ProjectsPageHeadline } from "./ProjectsPageHeadline";
import { ProjectsFilter } from "./ProjectsFilter";
import { ProjectList } from "./ProjectList";

export class ProjectsPage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.resources = {};
  // }

  componentWillMount() {
    document.title = `${config.brandName} - Projects`;
  }

  render() {
    return (
      <PrivateLayout>
        <PageTitle>Projects overview</PageTitle>
        <MarginedLayout>
          <ProjectsPageHeadline />
          <ProjectsFilter />
          <ProjectList />
        </MarginedLayout>
      </PrivateLayout>
    );
  }
}
