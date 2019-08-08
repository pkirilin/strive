import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProjectForm from "../ProjectForm";
import { projectsActions } from "../../../_actions";

const ProjectFormContainer = props => {
  return <ProjectForm {...props} />;
};

ProjectFormContainer.propTypes = {
  id: PropTypes.string,
  loadingText: PropTypes.string,
  submitButtonText: PropTypes.string,
  sendingProjectInfo: PropTypes.bool,
  badRequestResponse: PropTypes.shape({
    projectNameRemote: PropTypes.arrayOf(PropTypes.string)
  }),
  internalServerError: PropTypes.string,
  gettingProjectForUpdate: PropTypes.bool,
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }),
  notFoundProjectForUpdate: PropTypes.bool,
  failedToFetchProjectForUpdate: PropTypes.bool,
  createProject: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  getProjectInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {
    sendingProjectInfo,
    badRequestResponse,
    internalServerError
  } = state.projects.operations;

  const { loading, project, notFound, failedToFetch } = state.projects.info;

  return {
    sendingProjectInfo,
    badRequestResponse,
    internalServerError,
    gettingProjectForUpdate: loading,
    project,
    notFoundProjectForUpdate: notFound,
    failedToFetchProjectForUpdate: failedToFetch
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
)(ProjectFormContainer);
