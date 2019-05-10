import React from "react";
import { alertActions } from "./alert.actions";
import { projectListConstants } from "../_constants";
import { httpStatuses, history } from "../_helpers";
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
            history.push("/account/login");
            break;
          case httpStatuses.badRequest:
            dispatch(error({ badRequest: true }));
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
      projectFetchedResponse => {
        switch (projectFetchedResponse.status) {
          case httpStatuses.ok:
            projectFetchedResponse.json().then(projectFetched => {
              dispatch(success(projectFetched));
            });
            break;
          case httpStatuses.unauthorized:
            history.push("/account/login");
            break;
          case httpStatuses.notFound:
            dispatch(
              error({
                notFound: true
              })
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
      type: projectListConstants.GET_PROJECT_REQUEST,
      projectId
    };
  }

  /** Get project info success action creator */
  function success(projectFetched) {
    return {
      type: projectListConstants.GET_PROJECT_SUCCESS,
      projectFetched
    };
  }

  /** Get project info error action creator */
  function error(errorData) {
    return {
      type: projectListConstants.GET_PROJECT_ERROR,
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
            history.push("/projects/overview");
            dispatch(
              alertActions.success(
                <div>
                  The project <b>{project.name}</b> has been successfully
                  created
                </div>
              )
            );
            break;
          case httpStatuses.unauthorized:
            history.push("/account/login");
            break;
          case httpStatuses.badRequest:
            createProjectResponse
              .json()
              .then(createProjectBadRequestJsonData => {
                if (createProjectBadRequestJsonData) {
                  dispatch(badRequest(createProjectBadRequestJsonData));
                }
              });
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
      type: projectListConstants.CREATE_REQUEST,
      project
    };
  }

  /** Create project success action creator */
  function success(project) {
    return {
      type: projectListConstants.CREATE_SUCCESS,
      project
    };
  }

  /** Create project error action creator */
  function error(error) {
    return {
      type: projectListConstants.CREATE_ERROR,
      error
    };
  }

  /** Create project bad request action creator */
  function badRequest(badRequestResponseJson) {
    return {
      type: projectListConstants.CREATE_BADREQUEST,
      badRequestResponseJson
    };
  }
}

/**
 * Redux action creator, updates project for current user
 * @param {number} projectId Id of project to be updated
 * @param {object} project Modified project data
 */
function update(projectId, project) {
  return dispatch => {
    dispatch(request(projectId, project));
    projectsService.update(projectId, project).then(
      updateProjectResponse => {
        switch (updateProjectResponse.status) {
          case httpStatuses.ok:
            dispatch(success(projectId, project));
            history.push("/projects/overview");
            dispatch(
              alertActions.success(
                <div>
                  The project <b>{project.name}</b> has been successfully
                  updated
                </div>
              )
            );
            break;
          case httpStatuses.unauthorized:
            history.push("/account/login");
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
  function request(projectId, project) {
    return {
      type: projectListConstants.UPDATE_REQUEST,
      projectId,
      project
    };
  }

  /** Update project success action creator */
  function success(projectId, project) {
    return {
      type: projectListConstants.UPDATE_SUCCESS,
      projectId,
      project
    };
  }

  /** Update project error action creator */
  function error(error) {
    return {
      type: projectListConstants.UPDATE_ERROR,
      error
    };
  }

  /** Update project bad request action creator */
  function badRequest(badRequestResponseJson) {
    return {
      type: projectListConstants.UPDATE_BADREQUEST,
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
            deleteProjectResponse.json().then(deletedProject => {
              dispatch(success(deletedProject));
              dispatch(
                alertActions.success(
                  <div>
                    The project <b>{deletedProject.name}</b> has been
                    successfully deleted
                  </div>
                )
              );
            });
            break;
          case httpStatuses.unauthorized:
            history.push("/account/login");
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
      type: projectListConstants.DELETE_REQUEST,
      projectId
    };
  }

  /**
   * Delete project success action creator
   * @param {object} deletedProject Deleted project data
   */
  function success(deletedProject) {
    return {
      type: projectListConstants.DELETE_SUCCESS,
      deletedProject
    };
  }

  /**
   * Delete project error action creator
   * @param {string} error Error message
   */
  function error(error) {
    return {
      type: projectListConstants.DELETE_ERROR,
      error
    };
  }
}
