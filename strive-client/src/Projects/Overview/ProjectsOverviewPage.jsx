import React from "react";
import {
  PrivateLayout,
  DocumentTitleSetter,
  AppHeader
} from "../../_components";
import { ProjectsOverviewHeadline } from "./ProjectsOverviewHeadline";
import { ProjectsFilter } from "./ProjectsFilter";
import { ProjectList } from "./ProjectList";

export class ProjectsOverviewPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter values={["Projects"]}>
        <PrivateLayout>
          <AppHeader>Projects</AppHeader>
          <ProjectsOverviewHeadline />
          <ProjectsFilter />
          <ProjectList />
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
