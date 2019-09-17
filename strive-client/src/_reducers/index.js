import { combineReducers } from "redux";
import { accountReducer } from "./account";
import { projectsReducer } from "./projects";
import { tasksReducer } from "./tasks";
import { taskStatusesReducer } from "./taskStatuses";
import { reducer as toastrReducer } from "react-redux-toastr";

const rootReducer = combineReducers({
  account: accountReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
  taskStatuses: taskStatusesReducer,
  toastr: toastrReducer
});

export default rootReducer;
