import React, { Component } from "react";
import {
  PrivateLayout,
  Header,
  DocumentTitleSetter,
  SectionSeparator
} from "../../../_components";
import CreateTaskForm from "../CreateTaskForm";
import { historyHelper } from "../../../_helpers";
import { toastr } from "react-redux-toastr";

export default class CreateTaskPage extends Component {
  constructor(props) {
    super(props);

    // If project id is not set, it's unable to create task, because it should be bound to specific project
    // Checking this if only create task is in process (where taskId is not defined)
    // Project id for update operation is received from reducer with task data
    const { projectId: projectIdStr } = this.props.match.params;
    this.projectId = Number(projectIdStr);
    if (isNaN(this.projectId)) {
      historyHelper.redirectToProjects();
      toastr.error(
        "Error",
        "Unable to determine project id. Redirected to your project list"
      );
    }
  }

  render() {
    return (
      <DocumentTitleSetter values={["Create task"]}>
        <PrivateLayout>
          <SectionSeparator>
            <Header>Create task</Header>
          </SectionSeparator>
          <SectionSeparator>
            <CreateTaskForm projectId={this.projectId} />
          </SectionSeparator>
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
