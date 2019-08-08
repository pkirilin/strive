import { projectOperationsConstants } from "../../_constants";

export const projectOperationsReducer = (state = {}, action) => {
  switch (action.type) {
    // Create project
    case projectOperationsConstants.CREATE_REQUEST:
      return {
        sendingProjectInfo: true
      };
    case projectOperationsConstants.CREATE_SUCCESS:
      return {};
    case projectOperationsConstants.CREATE_ERROR:
      return {};
    case projectOperationsConstants.CREATE_BADREQUEST:
      return {
        badRequestResponseJson: action.badRequestResponseJson
      };

    // Update project
    case projectOperationsConstants.UPDATE_REQUEST:
      return {
        sendingProjectInfo: true
      };
    case projectOperationsConstants.UPDATE_SUCCESS:
      return {};
    case projectOperationsConstants.UPDATE_ERROR:
      return {};
    case projectOperationsConstants.UPDATE_BADREQUEST:
      return {
        badRequestResponseJson: action.badRequestResponseJson
      };

    // Delete project
    case projectOperationsConstants.DELETE_REQUEST:
      return {
        deletingProject: true
      };
    case projectOperationsConstants.DELETE_SUCCESS:
      return {};
    case projectOperationsConstants.DELETE_ERROR:
      return {};
    default:
      return state;
  }
};
