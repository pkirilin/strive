import { combineReducers } from "redux";
import { projectInfoReducer } from "./projectInfo.reducer";
import { projectListReducer } from "./projectList.reducer";
import { projectOperationsReducer } from "./projectOperations.reducer";

export const projectsReducer = combineReducers({
  projectInfoReducer,
  projectListReducer,
  projectOperationsReducer
});
