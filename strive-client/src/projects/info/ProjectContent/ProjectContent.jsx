import React, { Component } from "react";
import PropTypes from "prop-types";
import { ConfirmationModal, Spinner } from "../../../_components";
import TaskListContainer from "../TaskListContainer";
import ProjectDataContainer from "../ProjectDataContainer";
import TaskChoosePanelContainer from "../TaskChoosePanelContainer";
import ProjectActionsContainer from "../ProjectActionsContainer";
import TaskStatusTabsPanelContainer from "../TaskStatusTabsPanelContainer";

export default class ProjectContent extends Component {
  static propTypes = {
    projectId: PropTypes.number.isRequired,
    loadingProjectData: PropTypes.bool,
    projectDataLoaded: PropTypes.bool,
    notFoundProjectData: PropTypes.bool,
    failedToFetchProjectData: PropTypes.bool,
    projectDataInternalServerError: PropTypes.string,
    deleteProjectModal: PropTypes.shape({
      title: PropTypes.string,
      message: PropTypes.node,
      onClose: PropTypes.func,
      onConfirm: PropTypes.func
    }),
    deletingProject: PropTypes.bool,
    loadProjectContent: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const { projectId, loadProjectContent } = props;
    loadProjectContent(projectId);
  }

  render() {
    const {
      loadingProjectData,
      projectDataLoaded,
      notFoundProjectData,
      failedToFetchProjectData,
      projectDataInternalServerError,
      deleteProjectModal,
      deletingProject
    } = this.props;

    let content = <div />;

    if (loadingProjectData) {
      content = <Spinner text="Getting project info from server" />;
    }

    if (projectDataLoaded) {
      const { projectId } = this.props;
      content = (
        <div>
          <ConfirmationModal {...deleteProjectModal} />
          <ProjectDataContainer />
          <ProjectActionsContainer />
          <TaskStatusTabsPanelContainer projectId={projectId} />
          <TaskChoosePanelContainer projectId={projectId} />
          <TaskListContainer projectId={projectId} />
        </div>
      );
    }

    // Deleting project modal confirmed, modal closed, deleting in process. Showing loading spinner
    if (deletingProject) {
      content = <Spinner text="Deleting project" />;
    }

    // Wrong project id
    if (notFoundProjectData) {
      content = (
        <div className="mt-4 mb-4 text-danger text-center">
          Failed to get project info: project was not found
        </div>
      );
    }

    // Server is not available, showing error message
    if (failedToFetchProjectData) {
      content = (
        <div className="mt-4 mb-4 text-danger text-center">
          Failed to get project info: server is not available
        </div>
      );
    }

    // Server-side exception/fail
    if (projectDataInternalServerError) {
      content = (
        <div className="mt-4 mb-4 text-danger text-center">
          Failed to get project info. {projectDataInternalServerError}
        </div>
      );
    }

    return <div>{content}</div>;
  }
}
