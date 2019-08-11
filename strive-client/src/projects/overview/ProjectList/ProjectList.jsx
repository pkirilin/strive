import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListGroup } from "reactstrap";
import { Spinner, ConfirmationModal } from "../../../_components";
import ProjectListItem from "../ProjectListItem";

export default class ProjectList extends Component {
  static propTypes = {
    loadingProjectList: PropTypes.bool,
    failedToFetch: PropTypes.bool,
    internalServerError: PropTypes.string,
    deletingProject: PropTypes.bool,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string
      })
    ).isRequired,
    deleteProjectModal: PropTypes.shape({
      title: PropTypes.string,
      message: PropTypes.node,
      onClose: PropTypes.func,
      onConfirm: PropTypes.func
    }),
    getProjects: PropTypes.func
  };

  constructor(props) {
    super(props);
    const { getProjects } = this.props;
    getProjects();
  }

  render() {
    const {
      loadingProjectList,
      failedToFetch,
      internalServerError,
      deletingProject,
      projects,
      deleteProjectModal
    } = this.props;

    // Rendering loading spinner while data is fetching from server
    if (loadingProjectList) {
      return <Spinner text="Getting projects" />;
    }

    // Server is not working, then showing a message, that data has not been fetched
    if (failedToFetch) {
      return (
        <div className="text-center text-danger">
          Failed to get projects: server is not available
        </div>
      );
    }

    // Server is working, but some server-side error occured
    if (internalServerError) {
      return (
        <div className="text-center text-danger">{internalServerError}</div>
      );
    }

    // Server is working, but no projects were found for target user
    if (projects.length === 0) {
      return (
        <div className="text-center text-secondary">Project list is empty</div>
      );
    }

    // Server worked fine and returned project collection
    return (
      <ListGroup>
        <ConfirmationModal {...deleteProjectModal} />
        {deletingProject && <Spinner text="Deleting project" />}
        {projects.map(project => (
          <ProjectListItem key={project.id} data={project} />
        ))}
      </ListGroup>
    );
  }
}
