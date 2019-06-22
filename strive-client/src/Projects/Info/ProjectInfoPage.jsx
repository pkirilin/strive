import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  DocumentTitleSetter,
  PrivateLayout,
  AppConfirmationModal,
  AppSpinner
} from "../../_components";
import { ProjectData } from "./ProjectData";
import { TaskStatusTabsPanel } from "./TaskStatusTabsPanel";
import { TaskChoosePanel } from "./TaskChoosePanel";
import { TaskList } from "./TaskList";
import { projectsActions, taskStatusesActions } from "../../_actions";
import { ProjectActions } from "./ProjectActions";

const mapStateToProps = state => {
  const {
    loading: loadingProjectData,
    loaded: projectDataLoaded,
    notFound: notFoundProjectData,
    failedToFetch: failedToFetchProjectData,
    internalServerError: projectDataInternalServerError
  } = state.projectsReducer.projectInfoReducer;

  const { deleteProjectModal } = state.modalReducer;
  const { deletingProject } = state.projectsReducer.projectOperationsReducer;

  return {
    loadingProjectData,
    projectDataLoaded,
    notFoundProjectData,
    failedToFetchProjectData,
    projectDataInternalServerError,
    deleteProjectModal,
    deletingProject
  };
};

class ProjectInfoPage extends React.Component {
  static propTypes = {
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
    deletingProject: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.projectId = Number(this.props.match.params.projectId);
    this.props.dispatch(projectsActions.getInfo(this.projectId));
    this.props.dispatch(taskStatusesActions.getStatusTabs(this.projectId));
    this.props.dispatch(taskStatusesActions.getStatusList());
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
      content = <AppSpinner text="Getting project info from server" />;
    }

    if (projectDataLoaded) {
      content = (
        <div>
          <AppConfirmationModal {...deleteProjectModal} />
          <ProjectData />
          <ProjectActions />
          <TaskStatusTabsPanel projectId={this.projectId} />
          <TaskChoosePanel projectId={this.projectId} />
          <TaskList projectId={this.projectId} />
        </div>
      );
    }

    // Deleting project modal confirmed, modal closed, deleting in process. Showing loading spinner
    if (deletingProject) {
      content = <AppSpinner text="Deleting project" />;
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

    return (
      <DocumentTitleSetter values={["Project info"]}>
        <PrivateLayout>{content}</PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}

const connectedProjectInfoPage = connect(mapStateToProps)(ProjectInfoPage);
export { connectedProjectInfoPage as ProjectInfoPage };
