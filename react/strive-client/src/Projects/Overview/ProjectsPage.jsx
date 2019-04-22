import React from "react";
import { PrivateLayout } from "../../_components";
import { config, getResourcesForCurrentCulture } from "../../_helpers";

export class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: getResourcesForCurrentCulture()
    };
  }

  componentWillMount() {
    document.title = `${config.brandName} - ${
      this.state.resources.title.projects.overview
    }`;
  }
  render() {
    return <PrivateLayout>Projects page</PrivateLayout>;
  }
}
