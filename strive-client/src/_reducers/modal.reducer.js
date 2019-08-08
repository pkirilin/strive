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

    case modalConstants.DELETE_TASK_OPEN:
      return {
        ...state,
        deleteTaskModal: {
          isOpen: true,
          ...action
        }
      };
    case modalConstants.DELETE_TASK_CLOSE:
      return {
        ...state,
        deleteTaskModal: {
          isOpen: false
        }
      };
    default:
      return state;
  }
};
