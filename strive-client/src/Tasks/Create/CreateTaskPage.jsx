import React from "react";
import { connect } from "react-redux";
import {
  PrivateLayout,
  AppHeader,
  DocumentTitleSetter,
  AppSectionSeparator
} from "../../_components";
import { CreateTaskForm } from "./CreateTaskForm";
import { alertActions } from "../../_actions";
import { historyHelper } from "../../_helpers";

class CreateTaskPage extends React.Component {
  constructor(props) {
    super(props);

    // If project id is not set, it's unable to create task, because it should be bound to specific project
    // Checking this if only create task is in process (where taskId is not defined)
    // Project id for update operation is received from reducer with task data
    const { projectId: projectIdStr } = this.props.match.params;
    this.projectId = Number(projectIdStr);
    if (isNaN(this.projectId)) {
      historyHelper.redirectToProjects();
      this.props.dispatch(
        alertActions.error(
          "Unable to determine project id. Redirected to your project list"
        )
      );
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

const connectedCreateTaskPage = connect()(CreateTaskPage);
export { connectedCreateTaskPage as CreateTaskPage };
