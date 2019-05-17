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

    // Create project
    case projectListConstants.CREATE_REQUEST:
      return {
        sendingProjectInfo: true,
        projects: [...state.projects]
      };
    case projectListConstants.CREATE_SUCCESS:
      return {
        projectCreated: true,
        projects: [...state.projects]
      };
    case projectListConstants.CREATE_ERROR:
      return {
        failedToCreateProject: true,
        projects: [...state.projects]
      };
    case projectListConstants.CREATE_BADREQUEST:
      return {
        badRequestResponseJson: action.badRequestResponseJson,
        projects: [...state.projects]
      };

    // Update project
    case projectListConstants.UPDATE_REQUEST:
      return {
        sendingProjectInfo: true,
        projects: [...state.projects]
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
        badRequestResponseJson: action.badRequestResponseJson,
        projects: [...state.projects]
      };

    case projectListConstants.DELETE_REQUEST:
      return {
        deletingProject: true,
        projects: [...state.projects]
      };
    case projectListConstants.DELETE_SUCCESS:
      return {
        projects: state.projects.filter(project => {
          if (project.id === action.deletedProject.id) {
            return false;
          }
          return true;
        })
      };
    case projectListConstants.DELETE_ERROR:
      return {
        projects: [...state.projects]
      };

    default:
      return state;
  }
};
