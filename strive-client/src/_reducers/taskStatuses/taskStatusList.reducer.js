import { taskStatusListConstants } from "../../_constants";

export const taskStatusListReducer = (state = {}, action) => {
  switch (action.type) {
    case taskStatusListConstants.GET_STATUSES_REQUEST:
      return {
        loadingStatusList: true
      };
    case taskStatusListConstants.GET_STATUSES_SUCCESS:
      return {
        taskStatuses: action.taskStatuses
      };
    case taskStatusListConstants.GET_STATUSES_ERROR:
      return {
        statusListError: action.error
      };
    default:
      return state;
  }
};
