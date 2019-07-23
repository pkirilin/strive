import React from "react";
import { connect } from "react-redux";
import { alertActions, modalActions, projectsActions } from "../../../_actions";
import ProjectActions from "../components/ProjectActions";
import { modalConstants } from "../../../_constants";

const mapStateToProps = state => {
  const { project } = state.projectsReducer.projectInfoReducer;
  return { project };
};

const mapDispatchToProps = dispatch => {
  function clearAlert() {
    dispatch(alertActions.clear());
  }

  function openDeleteProjectConfirmationModal(project) {
    dispatch(
      modalActions.open(modalConstants.DELETE_PROJECT_OPEN, {
        title: "Delete project confirmation",
        message: (
          <div>
            Delete project <b>{project.name}</b>?
          </div>
        ),
        onClose: () => {
          closeModal();
        },
        onConfirm: () => {
          closeModal();
          dispatch(projectsActions.delete(project.id));
        }
      })
    );

    const closeModal = () => {
      dispatch(modalActions.close(modalConstants.DELETE_PROJECT_CLOSE));
    };
  }

  return {
    clearAlert,
    openDeleteProjectConfirmationModal
  };
};

const ProjectActionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectActions);

export default ProjectActionsContainer;
