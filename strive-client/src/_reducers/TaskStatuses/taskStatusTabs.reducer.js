import { taskStatusTabsConstants } from "../../_constants";

export const taskStatusTabsReducer = (state = {}, action) => {
  switch (action.type) {
    case taskStatusTabsConstants.GET_STATUS_TABS_REQUEST:
      return {
        loadingStatusTabs: true
      };
    case taskStatusTabsConstants.GET_STATUS_TABS_SUCCESS:
      return {
        statusTabsData: action.statusTabsData
      };
    case taskStatusTabsConstants.GET_STATUS_TABS_ERROR:
      return {
        ...action.errorData
      };
    default:
      return state;
  }
};
