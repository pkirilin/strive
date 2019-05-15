import React from "react";
import {
  PrivateLayout,
  PageTitle,
  DocumentTitleSetter
} from "../../_components";
import { ProjectsOverviewHeadline } from "./ProjectsOverviewHeadline";
import { ProjectsFilter } from "./ProjectsFilter";
import { ProjectList } from "./ProjectList";

export class ProjectsOverviewPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter values={["Projects"]}>
        <PrivateLayout>
          <PageTitle>Projects</PageTitle>
          <ProjectsOverviewHeadline />
          <ProjectsFilter />
          <ProjectList />
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
