import { combineReducers } from "redux";
import { taskStatusesInfoReducer } from "./taskStatusesInfo.reducer";

export const taskStatusesReducer = combineReducers({
  taskStatusesInfoReducer
});
