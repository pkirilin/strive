import React from "react";
import { connect } from "react-redux";
import {
  PrivateLayout,
  AppHeader,
  DocumentTitleSetter
} from "../../_components";
import { tasksActions } from "../../_actions";
import { EditTaskForm } from "./EditTaskForm";

class EditTaskPage extends React.Component {
  constructor(props) {
    super(props);

    const { taskId } = this.props.match.params;
    this.props.dispatch(tasksActions.getInfo(taskId));
  }

  render() {
    return (
      <DocumentTitleSetter values={["Edit task"]}>
        <PrivateLayout>
          <AppHeader>Edit task</AppHeader>
          <EditTaskForm />
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}

const connectedEditTaskPage = connect()(EditTaskPage);
export { connectedEditTaskPage as EditTaskPage };
