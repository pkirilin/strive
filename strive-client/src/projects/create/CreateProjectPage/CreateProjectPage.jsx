import React, { Component } from "react";
import {
  PrivateLayout,
  Header,
  DocumentTitleSetter,
  SectionSeparator
} from "../../../_components";
import CreateProjectForm from "../CreateProjectForm";

export default class CreateProjectPage extends Component {
  render() {
    return (
      <DocumentTitleSetter values={["Create project"]}>
        <PrivateLayout>
          <SectionSeparator>
            <Header>Create project</Header>
          </SectionSeparator>
          <SectionSeparator>
            <CreateProjectForm />
          </SectionSeparator>
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
