import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  DocumentTitleSetter,
  PrivateLayout,
  AppConfirmationModal,
  Spinner
} from "../../../_components";
import TaskDataContainer from "../TaskDataContainer";

export default class TaskInfoPage extends Component {
  static propTypes = {
    notFoundTaskData: PropTypes.bool,
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
    const { deletingTask, notFoundTaskData, deleteTaskModal } = this.props;
    let content = (
      <div>
        <AppConfirmationModal {...deleteTaskModal} />
        <TaskDataContainer taskId={this.taskId} />
      </div>
    );

    // Deleting task modal confirmed, modal closed, deleting in process. Showing loading spinner
    if (deletingTask) {
      content = <Spinner text="Deleting task" />;
    }

    if (notFoundTaskData) {
      content = (
        <div className="mt-4 mb-4 text-danger text-center">
          Failed to get task: task was not found
        </div>
      );
    }

    return (
      <DocumentTitleSetter values={["Task info"]}>
        <PrivateLayout>{content}</PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
