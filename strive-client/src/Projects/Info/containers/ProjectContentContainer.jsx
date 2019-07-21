import { connect } from "react-redux";
import ProjectContent from "../components/ProjectContent";
import { projectsActions, taskStatusesActions } from "../../../_actions";

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
