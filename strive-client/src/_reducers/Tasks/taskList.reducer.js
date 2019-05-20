import { taskListConstants } from "../../_constants";

const initialState = {
  tasks: []
};

export const taskListReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get task list
    case taskListConstants.GET_LIST_REQUEST:
      return {
        loadingTasks: true,
        tasks: [...state.tasks]
      };
    case taskListConstants.GET_LIST_SUCCESS:
      return {
        tasks: [...action.tasks]
      };
    case taskListConstants.GET_LIST_ERROR:
      return {
        ...action.errorData,
        tasks: [...state.tasks]
      };

    default:
      return state;
  }
};
