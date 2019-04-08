import { combineReducers } from "redux";
import { accountReducer } from "./account.reducer";
import { alertReducer } from "./alert.reducer";

const rootReducer = combineReducers({
  accountReducer,
  alertReducer
});

export default rootReducer;
