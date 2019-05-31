import { taskOperationsConstants } from "../../_constants";

export const taskOperationsReducer = (state = {}, action) => {
  switch (action.type) {
    // Create task
    case taskOperationsConstants.CREATE_REQUEST:
      return {
        sendingTaskInfo: true
      };
    case taskOperationsConstants.CREATE_SUCCESS:
      return {
        taskCreated: true
      };
    case taskOperationsConstants.CREATE_ERROR:
      return {
        failedToCreateTask: true
      };
    case taskOperationsConstants.CREATE_BADREQUEST:
      return {
        badRequestResponseJson: action.badRequestResponseJson
      };

    // Update project
    case taskOperationsConstants.UPDATE_REQUEST:
      return {
        sendingTaskInfo: true
      };
    case taskOperationsConstants.UPDATE_SUCCESS:
      return {
        taskUpdated: true
      };
    case taskOperationsConstants.UPDATE_ERROR:
      return {
        failedToUpdateTask: true
      };
    case taskOperationsConstants.UPDATE_BADREQUEST:
      return {
        badRequestResponseJson: action.badRequestResponseJson
      };

    // Delete project
    case taskOperationsConstants.DELETE_REQUEST:
      return {
        deletingTask: true
      };
    case taskOperationsConstants.DELETE_SUCCESS:
      return {};
    case taskOperationsConstants.DELETE_ERROR:
      return {};
    default:
      return state;
  }
};
