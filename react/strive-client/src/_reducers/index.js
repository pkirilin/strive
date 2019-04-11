import { combineReducers } from "redux";
import { accountReducer } from "./Account";
import { alertReducer } from "./alert.reducer";

const rootReducer = combineReducers({
  accountReducer,
  alertReducer
});

export default rootReducer;
