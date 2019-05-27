import { combineReducers } from "redux";
import { taskInfoReducer } from "./taskInfo.reducer";
import { taskListReducer } from "./taskList.reducer";
import { taskOperationsReducer } from "./taskOperations.reducer";

export const tasksReducer = combineReducers({
  taskInfoReducer,
  taskListReducer,
  taskOperationsReducer
});
