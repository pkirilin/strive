import React, { Component } from "react";
import {
  PrivateLayout,
  DocumentTitleSetter,
  Header,
  SectionSeparator
} from "../../../_components";
import ProjectsOverviewHeadline from "../ProjectsOverviewHeadline";
import ProjectListContainer from "../ProjectListContainer";

export default class ProjectsOverviewPage extends Component {
  render() {
    return (
      <DocumentTitleSetter values={["Projects"]}>
        <PrivateLayout>
          <SectionSeparator>
            <Header>Projects overview</Header>
          </SectionSeparator>
          <SectionSeparator>
            <ProjectsOverviewHeadline />
          </SectionSeparator>
          <ProjectListContainer />
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
