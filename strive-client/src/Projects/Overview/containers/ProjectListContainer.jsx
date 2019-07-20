import { connect } from "react-redux";
import { projectsActions } from "../../../_actions";
import ProjectList from "../components/ProjectList";

const mapStateToProps = state => {
  const {
    loadingProjectList,
    failedToFetch,
    internalServerError,
    projects
  } = state.projectsReducer.projectListReducer;
  const { deletingProject } = state.projectsReducer.projectOperationsReducer;
  const { deleteProjectModal } = state.modalReducer;
  return {
    loadingProjectList,
    failedToFetch,
    internalServerError,
    deletingProject,
    projects,
    deleteProjectModal
  };
};

const mapDispatchToProps = dispatch => {
  function getProjects() {
    dispatch(projectsActions.getList());
  }

  return {
    getProjects
  };
};

const ProjectListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);

export default ProjectListContainer;
