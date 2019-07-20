import React, { Component } from "react";
import {
  PrivateLayout,
  DocumentTitleSetter,
  AppHeader,
  AppSectionSeparator
} from "../../../_components";
import ProjectsOverviewHeadline from "./ProjectsOverviewHeadline";
import ProjectListContainer from "../containers/ProjectListContainer";

export default class ProjectsOverviewPage extends Component {
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
          <ProjectListContainer />
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
