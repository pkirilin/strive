import { combineReducers } from "redux";
import { accountReducer } from "./Account";
import { projectsReducer } from "./Projects";
import { tasksReducer } from "./Tasks";
import { taskStatusesReducer } from "./TaskStatuses";
import { alertReducer } from "./alert.reducer";
import { modalReducer } from "./modal.reducer";

const rootReducer = combineReducers({
  accountReducer,
  projectsReducer,
  tasksReducer,
  taskStatusesReducer,
  alertReducer,
  modalReducer
});

export default rootReducer;
