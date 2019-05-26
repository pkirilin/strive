import { combineReducers } from "redux";
import { taskListReducer } from "./taskList.reducer";
import { taskOperationsReducer } from "./taskOperations.reducer";

export const tasksReducer = combineReducers({
  taskListReducer,
  taskOperationsReducer
});
