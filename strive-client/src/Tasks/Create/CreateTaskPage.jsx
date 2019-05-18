import React from "react";

import {
  PrivateLayout,
  AppHeader,
  DocumentTitleSetter
} from "../../_components";
import { TaskForm } from "../TaskForm";

export class CreateTaskPage extends React.Component {
  constructor(props) {
    super(props);

    // Getting projectId for task from browser history state
    let { state: historyState } = this.props.history.location;
    if (historyState && historyState.projectId) {
      this.projectId = Number(historyState.projectId);
    }
  }

  render() {
    return (
      <DocumentTitleSetter values={["Create task"]}>
        <PrivateLayout>
          <AppHeader>Create task</AppHeader>
          <TaskForm
            id="createTaskForm"
            loadingText="Creating task"
            submitButtonText="Create"
            projectId={this.projectId}
          />
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
