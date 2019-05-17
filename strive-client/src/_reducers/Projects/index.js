import { combineReducers } from "redux";
import { projectInfoReducer } from "./projectInfo.reducer";
import { projectListReducer } from "./projectList.reducer";

export const projectsReducer = combineReducers({
  projectInfoReducer,
  projectListReducer
});
