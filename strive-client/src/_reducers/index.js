import { combineReducers } from "redux";
import { accountReducer } from "./account";
import { projectsReducer } from "./projects";
import { tasksReducer } from "./tasks";
import { taskStatusesReducer } from "./taskStatuses";
import { alertReducer } from "./alert.reducer";
import { modalsReducer } from "./modal.reducer";

const rootReducer = combineReducers({
  account: accountReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
  taskStatuses: taskStatusesReducer,
  alert: alertReducer,
  modals: modalsReducer
});

export default rootReducer;
