import { config, httpHeaders } from "../_helpers";

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
  return fetch(`${config.apiUrl}/account/authenticate`, requestOptions)
    .then(handleResponse, handleError)
    .then(user => {
      if (user && user.token) {
        // Token found in the response, login successful
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    });
}

/**
 * Logs user out, clears client-side storage
 */
function logout() {
  localStorage.removeItem("user");
}

function handleResponse(response) {
  return new Promise((resolve, reject) => {
    if (response.ok) {
      // Return json if it was returned in the response
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        response.json().then(json => resolve(json));
      } else {
        resolve();
      }
    } else {
      // Return error message from response body
      response.text().then(text => reject(text));
    }
  });
}

function handleError(error) {
  return Promise.reject(error && error.message);
}
