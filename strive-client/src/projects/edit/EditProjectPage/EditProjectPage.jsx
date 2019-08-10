import React, { Component } from "react";
import {
  PrivateLayout,
  Header,
  DocumentTitleSetter,
  SectionSeparator
} from "../../../_components";
import EditProjectForm from "../EditProjectForm";

export default class EditProjectPage extends Component {
  render() {
    // Getting projectId for editing from request string
    const { projectId } = this.props.match.params;
    return (
      <DocumentTitleSetter values={["Edit project"]}>
        <PrivateLayout>
          <SectionSeparator>
            <Header>Edit project</Header>
          </SectionSeparator>
          <SectionSeparator>
            <EditProjectForm projectId={Number(projectId)} />
          </SectionSeparator>
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
