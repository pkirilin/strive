import { alertActions } from "./alert.actions";
import { projectListConstants } from "../_constants";
import { httpStatuses, history } from "../_helpers";
import { projectsService } from "../_services";

/** Contains Redux action creators for actions related to projects */
export const projectsActions = {
  /** Redux action creator, gets projects list for current user from server */
  getList,

  /** Redux action creator, creates project for current user */
  create
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
