import { projectListConstants } from "../../_constants";

let initialState = {
  projects: []
};

export const projectListReducer = (state = initialState, action) => {
  // Get project list
  switch (action.type) {
    case projectListConstants.GET_LIST_REQUEST:
      return {
        loadingProjectList: true,
        projects: [...state.projects]
      };
    case projectListConstants.GET_LIST_SUCCESS:
      return {
        projects: [...action.projects]
      };
    case projectListConstants.GET_LIST_ERROR:
      return {
        ...action.errorData,
        projects: [...state.projects]
      };

    // Get project
    case projectListConstants.GET_PROJECT_REQUEST:
      return {
        projects: [...state.projects],
        gettingProjectForUpdate: true
      };
    case projectListConstants.GET_PROJECT_SUCCESS:
      return {
        projects: [...state.projects],
        projectFetched: action.projectFetched
      };
    case projectListConstants.GET_PROJECT_ERROR:
      return {
        projects: [...state.projects]
      };

    // Create project
    case projectListConstants.CREATE_REQUEST:
      return {
        projects: [...state.projects],
        sendingProjectInfo: true
      };
    case projectListConstants.CREATE_SUCCESS:
      return {
        projects: [...state.projects],
        projectCreated: true
      };
    case projectListConstants.CREATE_ERROR:
      return {
        projects: [...state.projects],
        failedToCreateProject: true
      };
    case projectListConstants.CREATE_BADREQUEST:
      return {
        projects: [...state.projects],
        badRequestResponseJson: action.badRequestResponseJson
      };

    // Update project
    case projectListConstants.UPDATE_REQUEST:
      return {
        projects: [...state.projects],
        sendingProjectInfo: true
      };
    case projectListConstants.UPDATE_SUCCESS:
      return {
        projects: [...state.projects]
      };
    case projectListConstants.UPDATE_ERROR:
      return {
        projects: [...state.projects]
      };
    case projectListConstants.UPDATE_BADREQUEST:
      return {
        projects: [...state.projects],
        badRequestResponseJson: action.badRequestResponseJson
      };

    default:
      return state;
  }
};
