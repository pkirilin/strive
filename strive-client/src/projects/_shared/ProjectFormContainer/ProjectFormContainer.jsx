import { connect } from "react-redux";
import ProjectForm from "../ProjectForm";
import { projectsActions } from "../../../_actions";

const mapStateToProps = state => {
  const { sendingProjectInfo, badRequestResponse } = state.projects.operations;
  const {
    loading: gettingProjectForUpdate,
    project,
    projectInfoError
  } = state.projects.info;

  return {
    sendingProjectInfo,
    badRequestResponse,
    gettingProjectForUpdate,
    project,
    projectInfoError
  };
};

const mapDispatchToProps = dispatch => {
  function createProject(projectData) {
    dispatch(projectsActions.create(projectData));
  }

  function updateProject(projectData) {
    dispatch(projectsActions.update(projectData));
  }

  function getProjectInfo(projectId) {
    dispatch(projectsActions.getInfo(projectId));
  }

  return {
    createProject,
    updateProject,
    getProjectInfo
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectForm);
