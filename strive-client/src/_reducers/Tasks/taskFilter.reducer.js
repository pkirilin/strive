import { taskFilterConstants } from "../../_constants";

export const taskFilterReducer = (state = {}, action) => {
  switch (action.type) {
    case taskFilterConstants.UPDATE:
      return {
        ...state,
        ...action.filterValues
      };
    default:
      return state;
  }
};
