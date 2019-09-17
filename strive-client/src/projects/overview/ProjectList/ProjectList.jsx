import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListGroup } from "reactstrap";
import { Spinner, SectionSeparator } from "../../../_components";
import ProjectListItem from "../ProjectListItem";

export default class ProjectList extends Component {
  static propTypes = {
    loadingProjectList: PropTypes.bool,
    projectListError: PropTypes.shape({
      message: PropTypes.string.isRequired
    }),
    deletingProject: PropTypes.bool,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string
      })
    ).isRequired,
    getProjects: PropTypes.func
  };

  componentDidMount() {
    const { getProjects } = this.props;
    getProjects();
  }

  render() {
    const {
      loadingProjectList,
      projectListError,
      deletingProject,
      projects
    } = this.props;

    // Rendering loading spinner while data is fetching from server
    if (loadingProjectList) {
      return <Spinner text="Getting projects" />;
    }

    // If any error occured, showing error message
    if (projectListError) {
      return (
        <SectionSeparator>
          <div className="text-center text-danger">
            {projectListError.message}
          </div>
        </SectionSeparator>
      );
    }

    // Server is working, but no projects were found
    if (projects.length === 0) {
      return (
        <div className="text-center text-secondary">Project list is empty</div>
      );
    }

    // Server worked fine and returned project collection
    return (
      <ListGroup>
        {deletingProject && <Spinner text="Deleting project" />}
        {projects.map(project => (
          <ProjectListItem key={project.id} data={project} />
        ))}
      </ListGroup>
    );
  }
}
