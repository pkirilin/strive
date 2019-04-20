import { config, httpHeaders } from "../_helpers";
import Cookies from "js-cookie";

/** Encapsulates all backend api calls for performing operations on account controller */
export const accountService = {
  /** Performs api call to register method of account controller */
  register,
  /** Performs api call to authentication method of account controller */
  login,
  /** Logs user out, clears client-side storage */
  logout
};

/**
 * Performs api call to register method of account controller
 * @param {object} user User register DTO
 * @returns Fetch response promise
 */
function register(user) {
  const requestOptions = {
    method: "POST",
    headers: httpHeaders.contentTypeJson,
    body: JSON.stringify(user)
  };
  return fetch(`${config.apiUrl}/account/register`, requestOptions);
}

/**
 * Performs api call to authentication method of account controller
 * @param {object} user User login DTO
 * @returns Fetch response promise
 */
function login(user) {
  const requestOptions = {
    method: "POST",
    headers: httpHeaders.contentTypeJson,
    body: JSON.stringify(user)
  };
  return fetch(`${config.apiUrl}/account/authenticate`, requestOptions);
}

/**
 * Logs user out, clears cookie with user info
 */
function logout() {
  Cookies.remove("user");
}
