import { combineReducers } from "redux";
import { accountReducer } from "./Account";
import { projectsReducer } from "./Projects";
import { alertReducer } from "./alert.reducer";
import { modalReducer } from "./modal.reducer";

const rootReducer = combineReducers({
  accountReducer,
  projectsReducer,
  alertReducer,
  modalReducer
});

export default rootReducer;
