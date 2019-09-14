import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import {
  Spinner,
  TaskStatusBadge,
  Header,
  SectionSeparator
} from "../../../_components";
import TaskActionsDropdownContainer from "../TaskActionsDropdownContainer";

export default class TaskData extends Component {
  static propTypes = {
    taskId: PropTypes.number.isRequired,
    gettingTask: PropTypes.bool,
    task: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired
      })
    }),
    taskInfoError: PropTypes.shape({
      message: PropTypes.string.isRequired
    }),
    getTask: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { taskId, getTask } = this.props;
    getTask(taskId);
  }

  render() {
    const { gettingTask, task, taskInfoError } = this.props;

    // Server is working and some task data was received
    if (task) {
      return (
        <div>
          <SectionSeparator>
            <Header level="2" centered={false}>
              {task.title}
            </Header>
          </SectionSeparator>
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
              <TaskActionsDropdownContainer taskId={task.id} />
            </Col>
          </Row>
          {task.description !== "" && task.description !== undefined ? (
            <SectionSeparator>
              <span className="font-weight-light">Description:</span>
              <span className="ml-1">{task.description}</span>
            </SectionSeparator>
          ) : (
            <SectionSeparator>
              <span className="text-black-50">No description provided</span>
            </SectionSeparator>
          )}
        </div>
      );
    }

    // If any error occured, showing error message
    if (taskInfoError) {
      return (
        <SectionSeparator>
          <div className="text-danger text-center">{taskInfoError.message}</div>
        </SectionSeparator>
      );
    }

    // Showing loading spinner while loading task data from server
    return <div>{gettingTask && <Spinner text="Getting task data" />}</div>;
  }
}
