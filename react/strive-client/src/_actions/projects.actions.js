import { projectListConstants } from "../_constants";
import { httpStatuses, history } from "../_helpers";
import { projectsService } from "../_services";

/** Contains Redux action creators for actions related to projects */
export const projectsActions = {
  /** Redux action creator, gets projects list for current user from server */
  getList,
  add
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

function add(project) {
  return dispatch => {
    dispatch(success(project));
  };

  function success(project) {
    return {
      type: projectListConstants.ADD_SUCCESS,
      project
    };
  }
}
