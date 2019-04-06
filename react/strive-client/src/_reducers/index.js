import { combineReducers } from "redux";
import { registerReducer } from "./register.reducer";

const rootReducer = combineReducers({ registerReducer });

export default rootReducer;
