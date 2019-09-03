import { projectListConstants } from "../../_constants";

const initialState = {
  projects: []
};

export const projectListReducer = (state = initialState, action) => {
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
        projects: [...state.projects],
        projectListError: action.error
      };
    default:
      return state;
  }
};
