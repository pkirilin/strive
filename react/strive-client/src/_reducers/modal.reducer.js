import { modalConstants } from "../_constants";

export const modalReducer = (state = {}, action) => {
  switch (action.type) {
    case modalConstants.DELETE_PROJECT_OPEN:
      return {
        ...state,
        deleteProjectModal: {
          isOpen: true,
          ...action
        }
      };
    case modalConstants.DELETE_PROJECT_CLOSE:
      return {
        ...state,
        deleteProjectModal: {
          isOpen: false
        }
      };
    default:
      return state;
  }
};
