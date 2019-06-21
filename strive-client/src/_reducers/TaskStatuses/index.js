import { combineReducers } from "redux";
import { taskStatusListReducer } from "./taskStatusList.reducer";
import { taskStatusTabsReducer } from "./taskStatusTabs.reducer";

export const taskStatusesReducer = combineReducers({
  taskStatusListReducer,
  taskStatusTabsReducer
});
