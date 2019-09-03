import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  DocumentTitleSetter,
  PrivateLayout,
  ConfirmationModal,
  Spinner,
  SectionSeparator
} from "../../../_components";
import TaskDataContainer from "../TaskDataContainer";

export default class TaskInfoPage extends Component {
  static propTypes = {
    taskInfoError: PropTypes.shape({
      message: PropTypes.string.isRequired
    }),
    deletingTask: PropTypes.bool,
    deleteTaskModal: PropTypes.shape({
      title: PropTypes.string,
      message: PropTypes.node,
      onClose: PropTypes.func,
      onConfirm: PropTypes.func
    })
  };

  constructor(props) {
    super(props);
    this.taskId = Number(this.props.match.params.taskId);
  }

  render() {
    const { taskInfoError, deletingTask, deleteTaskModal } = this.props;
    let content = (
      <div>
        <ConfirmationModal {...deleteTaskModal} />
        <TaskDataContainer taskId={this.taskId} />
      </div>
    );

    // If any error occured, showing error message
    if (taskInfoError) {
      content = (
        <SectionSeparator>
          <div className="text-danger text-center">{taskInfoError.message}</div>
        </SectionSeparator>
      );
    }

    // Deleting task modal confirmed, modal closed, deleting in process. Showing loading spinner
    if (deletingTask) {
      content = <Spinner text="Deleting task" />;
    }

    return (
      <DocumentTitleSetter values={["Task info"]}>
        <PrivateLayout>{content}</PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
