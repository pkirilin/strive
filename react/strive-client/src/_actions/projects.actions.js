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
  update
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
  return dispatch => {};
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
                `The project "${project.name}" has been successfully created`
              )
            );
            break;
          case httpStatuses.unauthorized:
            history.push("account/login");
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

  function request(project) {
    return {
      type: projectListConstants.CREATE_REQUEST,
      project
    };
  }

  function success(project) {
    return {
      type: projectListConstants.CREATE_SUCCESS,
      project
    };
  }

  function error(error) {
    return {
      type: projectListConstants.CREATE_ERROR,
      error
    };
  }

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
                `The project "${project.name}" has been successfully updated`
              )
            );
            break;
          case httpStatuses.unauthorized:
            history.push("account/login");
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

  function request(projectId, project) {
    return {
      type: projectListConstants.UPDATE_REQUEST,
      projectId,
      project
    };
  }

  function success(projectId, project) {
    return {
      type: projectListConstants.UPDATE_SUCCESS,
      projectId,
      project
    };
  }

  function error(error) {
    return {
      type: projectListConstants.UPDATE_ERROR,
      error
    };
  }

  function badRequest(badRequestResponseJson) {
    return {
      type: projectListConstants.UPDATE_BADREQUEST,
      badRequestResponseJson
    };
  }
}
