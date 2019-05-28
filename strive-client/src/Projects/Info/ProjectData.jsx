import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { AppHeader, AppSpinner } from "../../_components";
import { projectsActions, alertActions, modalActions } from "../../_actions";
import { actionHelper } from "../../_helpers";
import { modalConstants } from "../../_constants";

const mapStateToProps = state => {
  let {
    gettingProject,
    project,
    failedToFetch
  } = state.projectsReducer.projectInfoReducer;
  return {
    gettingProject,
    project,
    failedToFetch
  };
};

class ProjectData extends React.Component {
  static propTypes = {
    projectId: PropTypes.number.isRequired,

    gettingProject: PropTypes.bool,
    failedToFetch: PropTypes.bool,
    project: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  };

  constructor(props) {
    super(props);

    this.onNewTask = this.onNewTask.bind(this);
    this.onEditProject = this.onEditProject.bind(this);
    this.onDeleteProject = this.onDeleteProject.bind(this);

    this.props.dispatch(projectsActions.getInfo(this.props.projectId));
  }

  onNewTask() {
    actionHelper.redirectToCreateTask(this.props.projectId);
  }

  onEditProject() {
    actionHelper.redirectToEditProject(this.props.projectId);
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
    let { gettingProject, project, failedToFetch } = this.props;

    // Server is working and some project data was received
    if (project) {
      return (
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <AppHeader level="4" centered={false}>
              {project.name}
            </AppHeader>
            <div>{project.description}</div>
          </div>
          <UncontrolledDropdown>
            <DropdownToggle color="light border" caret>
              Actions
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header>Tasks</DropdownItem>
              <DropdownItem onClick={this.onNewTask}>New task</DropdownItem>
              <DropdownItem divider />
              <DropdownItem header>Project</DropdownItem>
              <DropdownItem onClick={this.onEditProject}>
                Edit project
              </DropdownItem>
              <DropdownItem onClick={this.onDeleteProject}>
                Delete project
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    }

    // Server is not available, showing error message
    if (failedToFetch) {
      return (
        <div className="mt-4 mb-4 text-danger text-center">
          Failed to get project: server is not available
        </div>
      );
    }

    // Showing loading spinner while loading project data from server
    return (
      <div>{gettingProject && <AppSpinner text="Getting project data" />}</div>
    );
  }
}

const connectedProjectData = connect(mapStateToProps)(ProjectData);
export { connectedProjectData as ProjectData };
