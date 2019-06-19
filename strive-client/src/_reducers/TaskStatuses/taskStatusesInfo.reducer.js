import { taskStatusesInfoConstants } from "../../_constants";

export const taskStatusesInfoReducer = (state = {}, action) => {
  switch (action.type) {
    // Get status tabs
    case taskStatusesInfoConstants.GET_STATUS_TABS_REQUEST:
      return {
        loadingStatusTabs: true
      };
    case taskStatusesInfoConstants.GET_STATUS_TABS_SUCCESS:
      return {
        statusTabsData: action.statusTabsData
      };
    case taskStatusesInfoConstants.GET_STATUS_TABS_ERROR:
      return {
        ...action.errorData
      };
    default:
      return state;
  }
};
