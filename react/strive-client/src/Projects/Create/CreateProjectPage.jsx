import React from "react";
import { PrivateLayout, PageTitle } from "../../_components";
import { config, getResourcesForCurrentCulture } from "../../_helpers";
import { CreateProjectForm } from "./CreateProjectForm";

export class CreateProjectPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: getResourcesForCurrentCulture()
    };
  }

  componentWillMount() {
    document.title = `${config.brandName} - ${
      this.state.resources.title.projects.create
    }`;
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
