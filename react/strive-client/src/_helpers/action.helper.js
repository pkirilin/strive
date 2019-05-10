import { history } from "./history.helper";

/** Contains helper functions for using in app actions */
export const actionHelper = {
  /** Redirects user to login page */
  redirectToLogin
};

/** Redirects user to login page */
function redirectToLogin() {
  history.push("/account/login");
}
