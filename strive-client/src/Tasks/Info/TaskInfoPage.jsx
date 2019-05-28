import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import {
  DocumentTitleSetter,
  PrivateLayout,
  AppHeader,
  AppConfirmationModal
} from "../../_components";
import { TaskData } from "./TaskData";
import { TaskActions } from "./TaskActions";

const mapStateToProps = state => {
  let { notFound: notFoundTaskData } = state.tasksReducer.taskInfoReducer;
  let { deleteTaskModal } = state.modalReducer;
  return {
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
    let { notFoundTaskData, deleteTaskModal } = this.props;
    let content = (
      <div>
        <AppConfirmationModal {...deleteTaskModal} />
        <AppHeader>Task info (test)</AppHeader>
        <Row>
          <Col>
            <TaskData taskId={this.taskId} />
          </Col>
          <Col>
            <TaskActions taskId={this.taskId} />
          </Col>
        </Row>
      </div>
    );

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
