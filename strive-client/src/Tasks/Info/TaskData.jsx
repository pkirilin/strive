import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import {
  AppSpinner,
  TaskStatusBadge,
  AppHeader,
  AppSectionSeparator
} from "../../_components";
import { tasksActions } from "../../_actions";
import { TaskActionsDropdown } from "./TaskActionsDropdown";

const mapStateToProps = state => {
  let { gettingTask, task, failedToFetch } = state.tasksReducer.taskInfoReducer;
  return {
    gettingTask,
    task,
    failedToFetch
  };
};

class TaskData extends Component {
  static propTypes = {
    taskId: PropTypes.number.isRequired,

    gettingTask: PropTypes.bool,
    failedToFetch: PropTypes.bool,
    task: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired
      })
    })
  };

  constructor(props) {
    super(props);

    this.props.dispatch(tasksActions.getInfo(this.props.taskId));
  }

  render() {
    let { gettingTask, task, failedToFetch } = this.props;

    // Server is working and some task data was received
    if (task) {
      return (
        <div>
          <AppSectionSeparator>
            <AppHeader level="2" centered={false}>
              {task.title}
            </AppHeader>
          </AppSectionSeparator>
          <Row className="d-flex justify-content-between align-items-baseline">
            <Col xs="auto">
              <span className="font-weight-light">Status:</span>
              <span className="ml-1">
                <TaskStatusBadge>{task.status.label}</TaskStatusBadge>
              </span>
            </Col>
            <Col xs="auto">
              <span className="font-weight-light">Project:</span>
              <Link
                className="ml-1 text-body"
                to={`/projects/info/${task.project.id}`}
              >
                {task.project.name}
              </Link>
            </Col>
            <Col xs="auto">
              <TaskActionsDropdown taskId={task.id} />
            </Col>
          </Row>
          {task.description !== "" && task.description !== undefined ? (
            <AppSectionSeparator>
              <span className="font-weight-light">Description:</span>
              <span className="ml-1">{task.description}</span>
            </AppSectionSeparator>
          ) : (
            <AppSectionSeparator>
              <span className="text-black-50">No description provided</span>
            </AppSectionSeparator>
          )}
        </div>
      );
    }

    // Server is not available, showing error message
    if (failedToFetch) {
      return (
        <div className="mt-4 mb-4 text-danger text-center">
          Failed to get task: server is not available
        </div>
      );
    }

    // Showing loading spinner while loading task data from server
    return <div>{gettingTask && <AppSpinner text="Getting task data" />}</div>;
  }
}

const connectedTaskData = connect(mapStateToProps)(TaskData);
export { connectedTaskData as TaskData };
