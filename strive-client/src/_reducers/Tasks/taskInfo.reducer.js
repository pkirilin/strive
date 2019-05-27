import { taskInfoConstants } from "../../_constants/Tasks";

export const taskInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case taskInfoConstants.GET_TASK_REQUEST:
      return {
        gettingTask: true
      };
    case taskInfoConstants.GET_TASK_SUCCESS:
      return {
        task: action.task
      };
    case taskInfoConstants.GET_TASK_ERROR:
      return {
        ...action.errorData
      };
    default:
      return state;
  }
};
