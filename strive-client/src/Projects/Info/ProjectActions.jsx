import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Button
} from "reactstrap";
import { projectsActions, alertActions, modalActions } from "../../_actions";
import { historyHelper } from "../../_helpers";
import { modalConstants } from "../../_constants";
import { AppSectionSeparator } from "../../_components";

const mapStateToProps = state => {
  let { project } = state.projectsReducer.projectInfoReducer;
  return { project };
};

class ProjectActions extends Component {
  static propTypes = {
    project: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  };

  constructor(props) {
    super(props);

    this.onNewTask = this.onNewTask.bind(this);
    this.onEditProject = this.onEditProject.bind(this);
    this.onDeleteProject = this.onDeleteProject.bind(this);
  }

  onNewTask() {
    historyHelper.redirectToCreateTask(this.props.project.id);
  }

  onEditProject() {
    historyHelper.redirectToEditProject(this.props.project.id);
  }

  onDeleteProject() {
    let { project } = this.props;
    this.props.dispatch(alertActions.clear());
    this.props.dispatch(
      modalActions.open(modalConstants.DELETE_PROJECT_OPEN, {
        title: "Delete project confirmation",
        message: (
          <div>
            Delete project <b>{project.name}</b>?
          </div>
        ),
        onClose: () => {
          closeModal();
        },
        onConfirm: () => {
          closeModal();
          this.props.dispatch(projectsActions.delete(project.id));
        }
      })
    );

    const closeModal = () => {
      this.props.dispatch(
        modalActions.close(modalConstants.DELETE_PROJECT_CLOSE)
      );
    };
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

const connectedProjectActions = connect(mapStateToProps)(ProjectActions);
export { connectedProjectActions as ProjectActions };
