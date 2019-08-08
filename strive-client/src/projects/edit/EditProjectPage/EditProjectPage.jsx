import React, { Component } from "react";
import {
  PrivateLayout,
  AppHeader,
  DocumentTitleSetter,
  AppSectionSeparator
} from "../../../_components";
import EditProjectForm from "../EditProjectForm";

export default class EditProjectPage extends Component {
  render() {
    // Getting projectId for editing from request string
    const { projectId } = this.props.match.params;
    return (
      <DocumentTitleSetter values={["Edit project"]}>
        <PrivateLayout>
          <AppSectionSeparator>
            <AppHeader>Edit project</AppHeader>
          </AppSectionSeparator>
          <AppSectionSeparator>
            <EditProjectForm projectId={Number(projectId)} />
          </AppSectionSeparator>
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
