import React from "react";
import { PrivateLayout } from "../../_components";
import { config, getResourcesForCurrentCulture } from "../../_helpers";
import { ProjectsPageHeadline } from "./ProjectsPageHeadline";
import { ProjectsFilter } from "./ProjectsFilter";
import { ProjectList } from "./ProjectList";

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
    return (
      <PrivateLayout>
        <div className="p-3">
          <ProjectsPageHeadline />
          <ProjectsFilter />
          <ProjectList />
        </div>
      </PrivateLayout>
    );
  }
}
