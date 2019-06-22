import React from "react";
import {
  PrivateLayout,
  AppHeader,
  DocumentTitleSetter,
  AppSectionSeparator
} from "../../_components";
import { CreateProjectForm } from "./CreateProjectForm";

export class CreateProjectPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter values={["Create project"]}>
        <PrivateLayout>
          <AppSectionSeparator>
            <AppHeader>Create project</AppHeader>
          </AppSectionSeparator>
          <AppSectionSeparator>
            <CreateProjectForm />
          </AppSectionSeparator>
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
