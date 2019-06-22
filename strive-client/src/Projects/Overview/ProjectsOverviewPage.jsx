import React from "react";
import {
  PrivateLayout,
  DocumentTitleSetter,
  AppHeader,
  AppSectionSeparator
} from "../../_components";
import { ProjectsOverviewHeadline } from "./ProjectsOverviewHeadline";
import { ProjectList } from "./ProjectList";

export class ProjectsOverviewPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter values={["Projects"]}>
        <PrivateLayout>
          <AppSectionSeparator>
            <AppHeader>Projects overview</AppHeader>
          </AppSectionSeparator>
          <AppSectionSeparator>
            <ProjectsOverviewHeadline />
          </AppSectionSeparator>
          <ProjectList />
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
