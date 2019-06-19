import { taskStatusesInfoConstants } from "../_constants";
import { taskStatusesService } from "../_services";
import { httpStatuses, historyHelper, actionHelper } from "../_helpers";

/** Contains Redux action creators for actions related to task statuses */
export const taskStatusesActions = {
  /** Redux action creator, gets status tabs info for target project */
  getStatusTabs
};

/**
 * Redux action creator, gets status tabs info for target project
 * @param {number} projectId Target project id
 */
function getStatusTabs(projectId) {
  return dispatch => {
    dispatch(request(projectId));
    taskStatusesService.getStatusTabs(projectId).then(
      statusTabsResponse => {
        switch (statusTabsResponse.status) {
          case httpStatuses.ok:
            statusTabsResponse.json().then(statusTabsData => {
              dispatch(success(statusTabsData));
            });
            break;
          case httpStatuses.unauthorized:
            dispatch(error());
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
        dispatch(error({ failedToFetch: true }));
      }
    );
  };

  /** Get status tabs request action creator */
  function request(projectId) {
    return {
      type: taskStatusesInfoConstants.GET_STATUS_TABS_REQUEST,
      projectId
    };
  }

  /** Get status tabs success action creator */
  function success(statusTabsData) {
    return {
      type: taskStatusesInfoConstants.GET_STATUS_TABS_SUCCESS,
      statusTabsData
    };
  }

  /** Get status tabs error action creator */
  function error(errorData) {
    return {
      type: taskStatusesInfoConstants.GET_STATUS_TABS_ERROR,
      errorData
    };
  }
}
