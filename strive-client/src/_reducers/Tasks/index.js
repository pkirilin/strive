import { combineReducers } from "redux";
import { taskListReducer } from "./taskList.reducer";

export const tasksReducer = combineReducers({ taskListReducer });
