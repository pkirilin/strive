import { combineReducers } from "redux";
import { taskFilterReducer } from "./taskFilter.reducer";
import { taskInfoReducer } from "./taskInfo.reducer";
import { taskListReducer } from "./taskList.reducer";
import { taskOperationsReducer } from "./taskOperations.reducer";

export const tasksReducer = combineReducers({
  taskFilterReducer,
  taskInfoReducer,
  taskListReducer,
  taskOperationsReducer
});
