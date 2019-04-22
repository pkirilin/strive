import { projectListConstants } from "../../_constants";

let initialState = {
  projects: []
};

export const projectListReducer = (state = initialState, action) => {
  switch (action.type) {
    case projectListConstants.GET_ALL_SUCCESS:
      return {
        ...state,
        projects: [...action.projects]
      };
    case projectListConstants.ADD_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, action.project]
      };
    default:
      return state;
  }
};
