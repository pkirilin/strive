import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Button
} from "reactstrap";
import { historyHelper } from "../../../_helpers";
import { AppSectionSeparator } from "../../../_components";

export default class ProjectActions extends Component {
  static propTypes = {
    project: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }),
    clearAlert: PropTypes.func.isRequired,
    openDeleteProjectConfirmationModal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onNewTask = this.onNewTask.bind(this);
    this.onEditProject = this.onEditProject.bind(this);
    this.onDeleteProject = this.onDeleteProject.bind(this);
  }

  onNewTask() {
    const { project } = this.props;
    historyHelper.redirectToCreateTask(project.id);
  }

  onEditProject() {
    const { project } = this.props;
    historyHelper.redirectToEditProject(project.id);
  }

  onDeleteProject() {
    const {
      project,
      clearAlert,
      openDeleteProjectConfirmationModal
    } = this.props;

    clearAlert();
    openDeleteProjectConfirmationModal(project);
  }

  render() {
    return (
      <Row className="d-flex justify-content-between">
        <Col xs="auto">
          <AppSectionSeparator>
            <Button color="light border" onClick={this.onNewTask}>
              New task
            </Button>
          </AppSectionSeparator>
        </Col>
        <Col xs="auto">
          <AppSectionSeparator>
            <UncontrolledDropdown>
              <DropdownToggle color="light border" caret>
                Actions
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={this.onEditProject}>
                  Edit project
                </DropdownItem>
                <DropdownItem onClick={this.onDeleteProject}>
                  Delete project
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </AppSectionSeparator>
        </Col>
      </Row>
    );
  }
}
