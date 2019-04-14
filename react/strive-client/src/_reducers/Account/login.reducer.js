import { loginConstants } from "../../_constants";

// Using webStorage for storing personal info and auth tokens is quite a controversial decision
// TODO: Think about using cookie instead of webStorage here
// Seems like React gives an opportunity to use webStorage safely
// https://stackoverflow.com/questions/44133536/is-it-safe-to-store-a-jwt-in-localstorage-with-reactjs
let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case loginConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case loginConstants.LOGIN_ERROR:
      return {};
    case loginConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};
