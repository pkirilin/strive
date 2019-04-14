import { config, httpHeaders } from "../_helpers";

/** Encapsulates all backend api calls for performing operations on account controller */
export const accountService = {
  /** Performs api call to register method of account controller */
  register,
  /** Performs api call to authentication method of account controller */
  login
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
