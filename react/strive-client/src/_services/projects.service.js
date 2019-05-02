import { config, httpHeaders } from "../_helpers";
import Cookies from "js-cookie";

/** Encapsulates all backend api calls for performing operations on project controller */
export const projectsService = {
  /** Performs api call to get-list method of project controller */
  getList
};

/** Performs api call to get-list method of project controller */
function getList() {
  // Getting user info from Cookies
  let userFromCookies = Cookies.getJSON(config.cookies.user.keyName);
  const requestOptions = {
    method: "GET",
    headers: httpHeaders.authorization()
  };
  return fetch(
    `${config.apiUrl}/projects/get-list?userId=${userFromCookies.id}`,
    requestOptions
  );
}
