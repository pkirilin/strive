import React from "react";
import { PrivateLayout, PageTitle } from "../../_components";
import { config } from "../../_helpers";
import { CreateProjectForm } from "./CreateProjectForm";

export class CreateProjectPage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.resources = {};
  // }

  componentWillMount() {
    document.title = `${config.brandName} - Create project`;
  }

  render() {
    return (
      <PrivateLayout>
        <PageTitle>Create project</PageTitle>
        <CreateProjectForm />
      </PrivateLayout>
    );
  }
}
