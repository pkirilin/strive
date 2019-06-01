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

    default:
      return state;
  }
};
