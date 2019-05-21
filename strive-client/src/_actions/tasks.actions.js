import { taskListConstants } from "../_constants";
import { tasksService } from "../_services";

/** Contains Redux action creators for actions related to tasks */
export const tasksActions = {
  /** Redux action creator, gets tasks list for current user and project from server */
  getList,

  /** Redux action cretor, selects/unselects all tasks for making changes */
  checkAll,

  checkTarget
};

/**
 * Redux action creator, gets tasks list for current user and project from server
 * @param {number} projectId Specified project id
 */
function getList(projectId) {
  return dispatch => {
    dispatch(request(projectId));
    tasksService.getList(projectId).then(tasks => {
      dispatch(success(tasks));
    });

    /** Get tasks list request action creator */
    function request(projectId) {
      return {
        type: taskListConstants.GET_LIST_REQUEST,
        projectId
      };
    }

    /** Get tasks list success action creator */
    function success(tasks) {
      return {
        type: taskListConstants.GET_LIST_SUCCESS,
        tasks
      };
    }

    /** Get tasks list error action creator */
    // function error(errorData) {
    //   return {
    //     type: taskListConstants.GET_LIST_ERROR,
    //     errorData
    //   };
    // }
  };
}

/** Redux action cretor, selects/unselects all tasks for making changes */
function checkAll() {
  return {
    type: taskListConstants.CHECK_ALL
  };
}

function checkTarget(targetTaskId) {
  return {
    type: taskListConstants.CHECK_TARGET,
    targetTaskId
  };
}
