import { projectInfoConstants } from "../../_constants";

export const projectInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case projectInfoConstants.GET_PROJECT_REQUEST:
      return {
        loading: true
      };
    case projectInfoConstants.GET_PROJECT_SUCCESS:
      return {
        loaded: true,
        project: action.project
      };
    case projectInfoConstants.GET_PROJECT_ERROR:
      return {
        ...action.errorData
      };
    default:
      return state;
  }
};
