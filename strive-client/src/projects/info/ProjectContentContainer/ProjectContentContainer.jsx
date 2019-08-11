import { connect } from "react-redux";
import ProjectContent from "../ProjectContent";
import { projectsActions, taskStatusesActions } from "../../../_actions";

const mapStateToProps = state => {
  const {
    loading: loadingProjectData,
    loaded: projectDataLoaded,
    notFound: notFoundProjectData,
    failedToFetch: failedToFetchProjectData,
    internalServerError: projectDataInternalServerError
  } = state.projects.info;

  const { deleteProjectModal } = state.modals;
  const { deletingProject } = state.projects.operations;

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

const mapDispatchToProps = dispatch => {
  function loadProjectContent(projectId) {
    dispatch(projectsActions.getInfo(projectId));
    dispatch(taskStatusesActions.getStatusTabs(projectId));
    dispatch(taskStatusesActions.getStatusList());
  }

  return {
    loadProjectContent
  };
};

const ProjectContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectContent);

export default ProjectContentContainer;
