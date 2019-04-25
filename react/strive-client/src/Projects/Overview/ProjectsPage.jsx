import React from "react";
import { PrivateLayout, PageTitle } from "../../_components";
import { config } from "../../_helpers";
import { ProjectsPageHeadline } from "./ProjectsPageHeadline";
import { ProjectsFilter } from "./ProjectsFilter";
import { ProjectList } from "./ProjectList";

export class ProjectsPage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.resources = {};
  // }

  componentWillMount() {
    document.title = `${config.brandName} - Projects`;
  }

  render() {
    return (
      <PrivateLayout>
        <PageTitle>Projects overview</PageTitle>
        <div className="p-3">
          <ProjectsPageHeadline />
          <ProjectsFilter />
          <ProjectList />
        </div>
      </PrivateLayout>
    );
  }
}
