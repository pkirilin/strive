// TODO: import { config } from "../../_helpers" makes config undefined
import { config } from "../../_helpers/config";
import { loginConstants } from "../../_constants";
import Cookies from "js-cookie";

let user = Cookies.getJSON(config.cookies.user.keyName);
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
