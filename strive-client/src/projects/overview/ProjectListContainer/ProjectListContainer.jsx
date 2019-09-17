import { connect } from "react-redux";
import { projectsActions } from "../../../_actions";
import ProjectList from "../ProjectList";

const mapStateToProps = state => {
  const {
    loadingProjectList,
    projectListError,
    projects
  } = state.projects.list;
  const { deletingProject } = state.projects.operations;
  return {
    loadingProjectList,
    projectListError,
    deletingProject,
    projects
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
