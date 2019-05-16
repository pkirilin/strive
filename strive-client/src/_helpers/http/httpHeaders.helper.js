import { config } from "../config.helper";
import Cookies from "js-cookie";

export const httpHeaders = {
  /** Returns authorization header with JWT-token */
  authorization,
  contentTypeJson: {
    "Content-Type": "application/json"
  }
};

/** Returns authorization header with JWT-token */
function authorization() {
  let user = Cookies.getJSON(config.cookies.user.keyName);
  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  }
  return {};
}
