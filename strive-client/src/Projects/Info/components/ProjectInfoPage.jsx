import React, { Component } from "react";
import { DocumentTitleSetter, PrivateLayout } from "../../../_components";
import ProjectContentContainer from "../containers/ProjectContentContainer";

export default class ProjectInfoPage extends Component {
  constructor(props) {
    super(props);
    this.projectId = Number(this.props.match.params.projectId);
  }

  render() {
    return (
      <DocumentTitleSetter values={["Project info"]}>
        <PrivateLayout>
          <ProjectContentContainer projectId={this.projectId} />
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
