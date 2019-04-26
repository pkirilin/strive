import React from "react";
import { PrivateLayout, PageTitle, MarginedLayout } from "../../_components";
import { config, getResources } from "../../_helpers";
import { CreateProjectForm } from "./CreateProjectForm";

export class CreateProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.resources = getResources();
  }

  componentWillMount() {
    let { documentTitles } = this.resources.projects;
    document.title = `${config.brandName} - ${documentTitles.create}`;
  }

  render() {
    let { titles } = this.resources.projects.create;
    return (
      <PrivateLayout>
        <PageTitle>{titles.pageHeader}</PageTitle>
        <MarginedLayout>
          <CreateProjectForm resources={this.resources} />
        </MarginedLayout>
      </PrivateLayout>
    );
  }
}
