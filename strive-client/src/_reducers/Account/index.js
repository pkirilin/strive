import { combineReducers } from "redux";
import { registerReducer } from "./register.reducer";
import { loginReducer } from "./login.reducer";

export const accountReducer = combineReducers({
  registerReducer,
  loginReducer
});
