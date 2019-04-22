import { combineReducers } from "redux";
import { alertReducer } from "./alert.reducer";
import { accountReducer } from "./Account";
import { projectsReducer } from "./Projects";

const rootReducer = combineReducers({
  accountReducer,
  alertReducer,
  projectsReducer
});

export default rootReducer;
