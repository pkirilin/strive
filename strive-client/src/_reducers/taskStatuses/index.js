import { combineReducers } from "redux";
import { taskStatusListReducer } from "./taskStatusList.reducer";
import { taskStatusTabsReducer } from "./taskStatusTabs.reducer";

export const taskStatusesReducer = combineReducers({
  list: taskStatusListReducer,
  tabs: taskStatusTabsReducer
});
