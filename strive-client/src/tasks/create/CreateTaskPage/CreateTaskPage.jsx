import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  PrivateLayout,
  AppHeader,
  DocumentTitleSetter,
  AppSectionSeparator
} from "../../../_components";
import CreateTaskForm from "../CreateTaskForm";
import { historyHelper } from "../../../_helpers";

export default class CreateTaskPage extends Component {
  static propTypes = {
    sendRedirectNotification: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    // If project id is not set, it's unable to create task, because it should be bound to specific project
    // Checking this if only create task is in process (where taskId is not defined)
    // Project id for update operation is received from reducer with task data
    const { projectId: projectIdStr } = this.props.match.params;
    this.projectId = Number(projectIdStr);
    if (isNaN(this.projectId)) {
      historyHelper.redirectToProjects();
      const { sendRedirectNotification } = this.props;
      sendRedirectNotification();
    }
  }

  render() {
    return (
      <DocumentTitleSetter values={["Create task"]}>
        <PrivateLayout>
          <AppSectionSeparator>
            <AppHeader>Create task</AppHeader>
          </AppSectionSeparator>
          <AppSectionSeparator>
            <CreateTaskForm projectId={this.projectId} />
          </AppSectionSeparator>
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
