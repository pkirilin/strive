import React from "react";
import { alertActions } from "./alert.actions";
import {
  projectInfoConstants,
  projectListConstants,
  projectOperationsConstants
} from "../_constants";
import { httpStatuses, actionHelper, historyHelper } from "../_helpers";
import { projectsService } from "../_services";

/** Contains Redux action creators for actions related to projects */
export const projectsActions = {
  /** Redux action creator, gets projects list for current user from server */
  getList,

  /** Redux action creator, gets project info for current user from server by id */
  getInfo,

  /** Redux action creator, creates project for current user */
  create,

  /** Redux action creator, updates project for current user */
  update,

  /** Redux action creator, deletes project */
  delete: deleteProject
};

/** Redux action creator, gets projects list for current user from server */
function getList() {
  return dispatch => {
    dispatch(request());
    projectsService.getList().then(
      projectListResponse => {
        switch (projectListResponse.status) {
          case httpStatuses.ok:
            projectListResponse.json().then(projects => {
              dispatch(success(projects));
            });
            break;
          case httpStatuses.unauthorized:
            historyHelper.redirectToLogin();
            break;
          case httpStatuses.internalServerError:
            actionHelper.handleInternalServerErrorResponse(
              projectListResponse,
              dispatch,
              error
            );
            break;
          default:
            break;
        }
      },
      () => {
        dispatch(error({ failedToFetch: true }));
      }
    );
  };

  /** Get projects list request action creator */
  function request() {
    return {
      type: projectListConstants.GET_LIST_REQUEST
    };
  }

  /**
   * Get projects list success action creator
   * @param {Array} projects Projects list received from server
   */
  function success(projects) {
    return {
      type: projectListConstants.GET_LIST_SUCCESS,
      projects
    };
  }

  /**
   * Get projects list error action creator
   * @param {object} errorData Error data indicating which type of error occured
   */
  function error(errorData) {
    return {
      type: projectListConstants.GET_LIST_ERROR,
      errorData
    };
  }
}

/**
 * Redux action creator, gets project info for current user from server by id
 * @param {number} projectId Target project id
 */
function getInfo(projectId) {
  return dispatch => {
    dispatch(request(projectId));
    projectsService.getInfo(projectId).then(
      projectResponse => {
        switch (projectResponse.status) {
          case httpStatuses.ok:
            projectResponse.json().then(project => {
              dispatch(success(project));
            });
            break;
          case httpStatuses.unauthorized:
            historyHelper.redirectToProjects();
            break;
          case httpStatuses.notFound:
            dispatch(
              error({
                notFound: true
              })
            );
            break;
          case httpStatuses.internalServerError:
            actionHelper.handleInternalServerErrorResponse(
              projectResponse,
              dispatch,
              error
            );
            break;
          default:
            break;
        }
      },
      () => {
        dispatch(
          error({
            failedToFetch: true
          })
        );
      }
    );
  };

  /** Get project info request action creator */
  function request(projectId) {
    return {
      type: projectInfoConstants.GET_PROJECT_REQUEST,
      projectId
    };
  }

  /** Get project info success action creator */
  function success(project) {
    return {
      type: projectInfoConstants.GET_PROJECT_SUCCESS,
      project
    };
  }

  /** Get project info error action creator */
  function error(errorData) {
    return {
      type: projectInfoConstants.GET_PROJECT_ERROR,
      errorData
    };
  }
}

/**
 * Redux action creator, creates project for current user
 * @param {object} project Project data
 */
function create(project) {
  return dispatch => {
    dispatch(request(project));
    projectsService.create(project).then(
      createProjectResponse => {
        switch (createProjectResponse.status) {
          case httpStatuses.ok:
            dispatch(success(project));
            historyHelper.redirectToProjects();
            dispatch(
              alertActions.success(
                <div>
                  Project <b>{project.name}</b> has been successfully created
                </div>
              )
            );
            break;
          case httpStatuses.unauthorized:
            historyHelper.redirectToLogin();
            break;
          case httpStatuses.badRequest:
            createProjectResponse.json().then(badRequestData => {
              if (badRequestData) {
                dispatch(badRequest(badRequestData));
              }
            });
            break;
          case httpStatuses.internalServerError:
            actionHelper.handleInternalServerErrorResponse(
              createProjectResponse,
              dispatch,
              error
            );
            break;
          default:
            break;
        }
      },
      errorResponse => {
        dispatch(error(errorResponse));
        dispatch(
          alertActions.error(
            "Failed to create project: server is not available"
          )
        );
      }
    );
  };

  /** Create project request action creator */
  function request(project) {
    return {
      type: projectOperationsConstants.CREATE_REQUEST,
      project
    };
  }

  /** Create project success action creator */
  function success(project) {
    return {
      type: projectOperationsConstants.CREATE_SUCCESS,
      project
    };
  }

  /** Create project error action creator */
  function error(error) {
    return {
      type: projectOperationsConstants.CREATE_ERROR,
      error
    };
  }

  /** Create project bad request action creator */
  function badRequest(badRequestResponseJson) {
    return {
      type: projectOperationsConstants.CREATE_BADREQUEST,
      badRequestResponseJson
    };
  }
}

/**
 * Redux action creator, updates project for current user
 * @param {object} project Modified project data
 */
function update(project) {
  return dispatch => {
    dispatch(request(project));
    projectsService.update(project).then(
      updateProjectResponse => {
        switch (updateProjectResponse.status) {
          case httpStatuses.ok:
            historyHelper.redirectToProjectInfo(project.id);
            dispatch(success(project));
            dispatch(
              alertActions.success(
                <div>
                  Project <b>{project.name}</b> has been successfully updated
                </div>
              )
            );
            break;
          case httpStatuses.unauthorized:
            historyHelper.redirectToLogin();
            break;
          case httpStatuses.badRequest:
            updateProjectResponse
              .json()
              .then(updateProjectBadRequestJsonData => {
                if (updateProjectBadRequestJsonData) {
                  dispatch(badRequest(updateProjectBadRequestJsonData));
                }
              });
            break;
          case httpStatuses.notFound:
            updateProjectResponse.json().then(notFoundProjectId => {
              dispatch(
                error(
                  `Server couldn't find a project with id = ${notFoundProjectId}`
                )
              );
              dispatch(
                alertActions.error(
                  "Failed to update project: server couldn't find target project"
                )
              );
            });
            break;
          case httpStatuses.internalServerError:
            actionHelper.handleInternalServerErrorResponse(
              updateProjectResponse,
              dispatch,
              error
            );
            break;
          default:
            break;
        }
      },
      errorResponse => {
        dispatch(error(errorResponse));
        dispatch(
          alertActions.error(
            "Failed to update project: server is not available"
          )
        );
      }
    );
  };

  /** Update project request action creator */
  function request(project) {
    return {
      type: projectOperationsConstants.UPDATE_REQUEST,
      project
    };
  }

  /** Update project success action creator */
  function success(project) {
    return {
      type: projectOperationsConstants.UPDATE_SUCCESS,
      project
    };
  }

  /** Update project error action creator */
  function error(error) {
    return {
      type: projectOperationsConstants.UPDATE_ERROR,
      error
    };
  }

  /** Update project bad request action creator */
  function badRequest(badRequestResponseJson) {
    return {
      type: projectOperationsConstants.UPDATE_BADREQUEST,
      badRequestResponseJson
    };
  }
}

/**
 * Redux action creator, deletes project
 * @param {number} projectId Id of project to be deleted
 */
function deleteProject(projectId) {
  return dispatch => {
    dispatch(request(projectId));
    projectsService.delete(projectId).then(
      deleteProjectResponse => {
        switch (deleteProjectResponse.status) {
          case httpStatuses.ok:
            historyHelper.redirectToProjects();
            dispatch(success(projectId));
            dispatch(
              alertActions.success(
                <div>Project has been successfully deleted</div>
              )
            );
            break;
          case httpStatuses.unauthorized:
            historyHelper.redirectToLogin();
            break;
          case httpStatuses.notFound:
            deleteProjectResponse.json().then(notFoundProjectId => {
              dispatch(
                error(
                  `Server couldn't find a project with id = ${notFoundProjectId}`
                )
              );
              dispatch(
                alertActions.error(
                  "Failed to delete project: server couldn't find target project"
                )
              );
            });
            break;
          case httpStatuses.internalServerError:
            actionHelper.handleInternalServerErrorResponse(
              deleteProjectResponse,
              dispatch,
              error
            );
            break;
          default:
            break;
        }
      },
      errorResponse => {
        dispatch(error(errorResponse));
        dispatch(
          alertActions.error(
            "Failed to delete project: server is not available"
          )
        );
      }
    );
  };

  /**
   * Delete project request action creator
   * @param {number} projectId Id of project to be deleted
   */
  function request(projectId) {
    return {
      type: projectOperationsConstants.DELETE_REQUEST,
      projectId
    };
  }

  /**
   * Delete project success action creator
   * @param {object} deletedProject Deleted project data
   */
  function success(deletedProjectId) {
    return {
      type: projectOperationsConstants.DELETE_SUCCESS,
      deletedProjectId
    };
  }

  /**
   * Delete project error action creator
   * @param {string} error Error message
   */
  function error(error) {
    return {
      type: projectOperationsConstants.DELETE_ERROR,
      error
    };
  }
}
