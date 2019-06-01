import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup } from "reactstrap";
import { ProjectListItem } from "./ProjectListItem";
import { projectsActions } from "../../_actions";
import { AppSpinner, AppConfirmationModal } from "../../_components";

const mapStateToProps = state => {
  let {
    loadingProjectList,
    failedToFetch,
    internalServerError,
    projects
  } = state.projectsReducer.projectListReducer;
  let { deletingProject } = state.projectsReducer.projectOperationsReducer;
  let { deleteProjectModal } = state.modalReducer;
  return {
    loadingProjectList,
    failedToFetch,
    internalServerError,
    deletingProject,
    projects,
    deleteProjectModal
  };
};

class ProjectList extends React.Component {
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
    })
  };

  constructor(props) {
    super(props);

    this.props.dispatch(projectsActions.getList());
  }

  render() {
    let {
      loadingProjectList,
      failedToFetch,
      internalServerError,
      deletingProject,
      projects,
      deleteProjectModal
    } = this.props;

    // Rendering loading spinner while data is fetching from server
    if (loadingProjectList) {
      return <AppSpinner text="Getting projects" />;
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
        <AppConfirmationModal {...deleteProjectModal} />
        {deletingProject && <AppSpinner text="Deleting project" />}
        {this.props.projects.map(project => (
          <ProjectListItem key={project.id} data={project} />
        ))}
      </ListGroup>
    );
  }
}

const connectedProjectList = connect(mapStateToProps)(ProjectList);
export { connectedProjectList as ProjectList };
