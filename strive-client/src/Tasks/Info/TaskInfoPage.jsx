import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  DocumentTitleSetter,
  PrivateLayout,
  AppConfirmationModal,
  AppSpinner
} from "../../_components";
import { TaskData } from "./TaskData";

const mapStateToProps = state => {
  let { notFound: notFoundTaskData } = state.tasksReducer.taskInfoReducer;
  let { deletingTask } = state.tasksReducer.taskOperationsReducer;
  let { deleteTaskModal } = state.modalReducer;
  return {
    deletingTask,
    notFoundTaskData,
    deleteTaskModal
  };
};

class TaskInfoPage extends React.Component {
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
    let { deletingTask, notFoundTaskData, deleteTaskModal } = this.props;
    let content = (
      <div>
        <AppConfirmationModal {...deleteTaskModal} />
        <TaskData taskId={this.taskId} />
      </div>
    );

    // Deleting task modal confirmed, modal closed, deleting in process. Showing loading spinner
    if (deletingTask) {
      content = <AppSpinner text="Deleting task" />;
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

const connectedTaskInfoPage = connect(mapStateToProps)(TaskInfoPage);
export { connectedTaskInfoPage as TaskInfoPage };
