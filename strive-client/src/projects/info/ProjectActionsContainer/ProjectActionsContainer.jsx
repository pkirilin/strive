import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { projectsActions } from "../../../_actions";
import ProjectActions from "../ProjectActions";

const mapStateToProps = state => {
  const { project } = state.projects.info;
  return { project };
};

const mapDispatchToProps = dispatch => {
  function openDeleteProjectConfirmationModal(project) {
    toastr.confirm(`Delete project "${project.name}"?`, {
      okText: "Yes",
      cancelText: "No",
      onOk: () => dispatch(projectsActions.delete(project))
    });
  }

  return {
    openDeleteProjectConfirmationModal
  };
};

const ProjectActionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectActions);

export default ProjectActionsContainer;
