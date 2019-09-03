import {
  taskStatusTabsConstants,
  taskStatusListConstants
} from "../_constants";
import { taskStatusesService } from "../_services";
import { httpStatuses, historyHelper, actionHelper } from "../_helpers";

/** Contains Redux action creators for actions related to task statuses */
export const taskStatusesActions = {
  /** Redux action creator, gets status tabs info for target project */
  getStatusTabs,

  /** Redux action creator, gets status list */
  getStatusList
};

/**
 * Redux action creator, gets status tabs info for target project
 * @param {number} projectId Target project id
 */
function getStatusTabs(projectId) {
  return dispatch => {
    dispatch(request(projectId));
    return taskStatusesService.getStatusTabs(projectId).then(
      statusTabsResponse => {
        switch (statusTabsResponse.status) {
          case httpStatuses.ok:
            statusTabsResponse.json().then(statusTabsData => {
              dispatch(success(statusTabsData));
            });
            break;
          case httpStatuses.unauthorized:
            historyHelper.redirectToLogin();
            break;
          case httpStatuses.internalServerError:
            actionHelper.handleInternalServerErrorResponse(
              statusTabsResponse,
              dispatch,
              error
            );
            break;
          default:
            break;
        }
      },
      () => {
        dispatch(error("Failed to get status tabs: server is not available"));
      }
    );
  };

  /** Get status tabs request action creator */
  function request(projectId) {
    return {
      type: taskStatusTabsConstants.GET_STATUS_TABS_REQUEST,
      projectId
    };
  }

  /** Get status tabs success action creator */
  function success(statusTabsData) {
    return {
      type: taskStatusTabsConstants.GET_STATUS_TABS_SUCCESS,
      statusTabsData
    };
  }

  /** Get status tabs error action creator */
  function error(errorMessage) {
    return {
      type: taskStatusTabsConstants.GET_STATUS_TABS_ERROR,
      error: {
        message: errorMessage
      }
    };
  }
}

/**
 * Redux action creator, gets status list
 */
function getStatusList() {
  return dispatch => {
    dispatch(request());
    taskStatusesService.getStatusList().then(
      statusListResponse => {
        switch (statusListResponse.status) {
          case httpStatuses.ok:
            statusListResponse.json().then(taskStatuses => {
              dispatch(success(taskStatuses));
            });
            break;
          case httpStatuses.unauthorized:
            historyHelper.redirectToLogin();
            break;
          case httpStatuses.internalServerError:
            actionHelper.handleInternalServerErrorResponse(
              statusListResponse,
              dispatch,
              error
            );
            break;
          default:
            break;
        }
      },
      () => {
        dispatch(error("Failed to load statuses"));
      }
    );
  };

  function request() {
    return {
      type: taskStatusListConstants.GET_STATUSES_REQUEST
    };
  }

  function success(taskStatuses) {
    return {
      type: taskStatusListConstants.GET_STATUSES_SUCCESS,
      taskStatuses
    };
  }

  function error(errorMessage) {
    return {
      type: taskStatusListConstants.GET_STATUSES_ERROR,
      error: {
        message: errorMessage
      }
    };
  }
}
