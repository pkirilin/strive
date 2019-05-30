import React from "react";

import {
  PrivateLayout,
  AppHeader,
  DocumentTitleSetter
} from "../../_components";
import { TaskForm } from "../TaskForm";
import { tasksActions } from "../../_actions";

export class EditTaskPage extends React.Component {
  constructor(props) {
    super(props);

    // Getting projectId for task from browser history state
    let { state: historyState } = this.props.history.location;
    if (historyState && historyState.projectId) {
      this.projectId = Number(historyState.projectId);
    }
  }

  render() {
    let { taskId } = this.props.match.params;
    taskId = Number(taskId);
    return (
      <DocumentTitleSetter values={["Edit task"]}>
        <PrivateLayout>
          <AppHeader>Edit task</AppHeader>
          {isNaN(taskId) ? (
            <div className="mt-4 mb-4 text-center text-danger">
              Wrong request string: parameter "taskId" is not a number
            </div>
          ) : (
            <TaskForm
              id="updateTaskForm"
              loadingText="Updating task"
              submitButtonText="Save"
              projectId={this.projectId}
              taskId={taskId}
              tasksAction={tasksActions.update}
            />
          )}
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
