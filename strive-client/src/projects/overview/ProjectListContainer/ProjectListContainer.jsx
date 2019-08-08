import { connect } from "react-redux";
import { projectsActions } from "../../../_actions";
import ProjectList from "../ProjectList";

const mapStateToProps = state => {
  const {
    loadingProjectList,
    failedToFetch,
    internalServerError,
    projects
  } = state.projects.list;
  const { deletingProject } = state.projects.operations;
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
