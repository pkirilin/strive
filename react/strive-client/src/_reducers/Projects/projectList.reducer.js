import { projectListConstants } from "../../_constants";

let initialState = {
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
        ...action.errorData,
        projects: [...state.projects]
      };

    case projectListConstants.ADD_SUCCESS:
      return state;
    // return {
    //   ...state,
    //   projects: [...state.projects, action.project]
    // };
    default:
      return state;
  }
};
