import React from "react";
import {
  PrivateLayout,
  AppHeader,
  DocumentTitleSetter
} from "../../_components";
import { CreateProjectForm } from "./CreateProjectForm";

export class CreateProjectPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter values={["Create project"]}>
        <PrivateLayout>
          <AppHeader>Create project</AppHeader>
          <CreateProjectForm />
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
