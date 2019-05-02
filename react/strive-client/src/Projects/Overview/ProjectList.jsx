import React from "react";
import { connect } from "react-redux";
import { ListGroup } from "reactstrap";
import { ProjectListItem } from "./ProjectListItem";
import { projectsActions } from "../../_actions";
import { Loading } from "../../_components";

const mapStateToProps = state => {
  let {
    loadingProjectList,
    failedToFetch,
    badRequest,
    projects
  } = state.projectsReducer.projectListReducer;
  return {
    loadingProjectList,
    failedToFetch,
    badRequest,
    projects
  };
};

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.resources = this.props.resources;

    this.props.dispatch(projectsActions.getList());
  }

  render() {
    let { contents } = this.resources.projects.overview;
    let {
      loadingProjectList,
      failedToFetch,
      badRequest,
      projects
    } = this.props;

    // Rendering loading spinner while data is fetching from server
    if (loadingProjectList) {
      return <Loading text={contents.loadingProjects} />;
    }

    // Server is not working, then showing a message, that data has not been fetched
    if (failedToFetch) {
      return (
        <div className="text-center text-danger">
          {contents.failedToGetProjects}
        </div>
      );
    }

    // Server is working, but some server-side error occured
    if (badRequest) {
      return (
        <div className="text-center text-danger">
          {contents.getProjectsBadRequest}
        </div>
      );
    }

    // Server is working, but no projects were found for target user
    if (projects.length === 0) {
      return (
        <div className="text-center text-secondary">
          {contents.projectsListEmpty}
        </div>
      );
    }

    // Server worked fine and returned project collection
    return (
      <ListGroup>
        {this.props.projects.map(project => (
          <ProjectListItem
            key={project.key}
            data={project}
            resources={this.resources}
          />
        ))}
      </ListGroup>
    );
  }
}

const connectedProjectList = connect(mapStateToProps)(ProjectList);
export { connectedProjectList as ProjectList };
