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

    // Task list checks - selects/unselects tasks for making some changes
    case taskListConstants.CHECK_ALL:
      return {
        tasks: state.tasks.map(task => {
          task.checked = action.chooseAllChecked;
          return task;
        })
      };
    case taskListConstants.CHECK_TARGET:
      return {
        tasks: state.tasks.map(task => {
          if (task.id === action.targetTaskId) {
            task.checked = !task.checked;
          }
          return task;
        })
      };

    default:
      return state;
  }
};
