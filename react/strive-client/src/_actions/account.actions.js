import { alertActions } from "../_actions";
import { registerConstants, loginConstants } from "../_constants";
import { config, httpStatuses, actionHelper } from "../_helpers";
import { accountService } from "../_services";
import Cookies from "js-cookie";

/** Contains Redux action creators for actions related to account */
export const accountActions = {
  /** Redux action creator, performs account registration */
  register,
  /** Redux action creator, performs authentication */
  login,
  /** Redux action creator, performs logout */
  logout
};

/**
 * Redux action creator, performs account registration
 * @param {object} user User register DTO
 */
function register(user) {
  return dispatch => {
    dispatch(request(user));
    accountService.register(user).then(
      // Server is available
      userResponse => {
        switch (userResponse.status) {
          case httpStatuses.ok:
            dispatch(success(userResponse));
            actionHelper.redirectToLogin();
            dispatch(alertActions.success("Registration successful"));
            break;
          case httpStatuses.badRequest:
            userResponse.json().then(
              // Server returned register validation error(s)
              badRequestJsonData => {
                if (badRequestJsonData !== undefined) {
                  // If there's something returned from server
                  dispatch(regBadRequest(badRequestJsonData));
                }
              }
            );
            break;
          case httpStatuses.internalServerError:
            actionHelper.handleInternalServerErrorResponse(
              userResponse,
              dispatch,
              error
            );
            break;
          default:
            break;
        }
      },
      // Server is not available
      errorResponse => {
        dispatch(error(errorResponse));
        dispatch(
          alertActions.error(
            "Registration failed: unable to fetch data from API"
          )
        );
      }
    );
  };

  /**
   * Register request action creator
   * @param {object} user User register DTO
   */
  function request(user) {
    return {
      type: registerConstants.REGISTER_REQUEST,
      user
    };
  }

  /**
   * Register success action creator
   * @param {object} user User register DTO
   */
  function success(user) {
    return {
      type: registerConstants.REGISTER_SUCCESS,
      user
    };
  }

  /**
   * Register error action creator
   * @param {string} error Error message
   */
  function error(error) {
    return {
      type: registerConstants.REGISTER_ERROR,
      error
    };
  }

  /**
   * Register API validation error action creator
   * @param {object} badRequestResponseJson JSON with remote validation errors
   */
  function regBadRequest(badRequestResponseJson) {
    return {
      type: registerConstants.REGISTER_BADREQUEST,
      badRequestResponseJson
    };
  }
}

/**
 * Redux action creator, performs authentication
 * @param {object} userLoginData User login request DTO
 */
function login(userLoginData) {
  let unauthorizedErrorMessage =
    "Authentication failed: wrong email or password";
  return dispatch => {
    dispatch(request(userLoginData));
    accountService.login(userLoginData).then(
      // Server is available
      userResponse => {
        switch (userResponse.status) {
          case httpStatuses.ok:
            userResponse.json().then(authenticatedUserJson => {
              let contentType = userResponse.headers.get("content-type");
              // Checking whether token found in the response
              if (
                contentType &&
                contentType.includes("application/json") &&
                authenticatedUserJson &&
                authenticatedUserJson.token
              ) {
                // Token found in the response, login successful
                if (
                  userLoginData.rememberMe &&
                  userLoginData.rememberMe === true
                ) {
                  // If user has set remember me checkbox, cookie will be saved for future
                  Cookies.set(
                    config.cookies.user.keyName,
                    authenticatedUserJson,
                    {
                      expires: config.cookies.user.expires
                    }
                  );
                } else {
                  // Remember me checkbox is not set, user cookie will be removed when the user closes the browser
                  Cookies.set(
                    config.cookies.user.keyName,
                    authenticatedUserJson
                  );
                }
                dispatch(success(authenticatedUserJson));
                actionHelper.redirectToRoot();
              } else {
                // Token not found, authentication failed
                dispatch(error(unauthorizedErrorMessage));
                dispatch(alertActions.error(unauthorizedErrorMessage));
              }
            });
            break;
          case httpStatuses.unauthorized:
            dispatch(error(unauthorizedErrorMessage));
            dispatch(alertActions.error(unauthorizedErrorMessage));
            break;
          case httpStatuses.internalServerError:
            actionHelper.handleInternalServerErrorResponse(
              userResponse,
              dispatch,
              error
            );
            break;
          default:
            break;
        }
      },
      // Server is not available
      errorResponse => {
        dispatch(error(errorResponse));
        dispatch(alertActions.error(unauthorizedErrorMessage));
      }
    );
  };

  /**
   * Login request action creator
   * @param {object} user User login request DTO
   */
  function request(user) {
    return {
      type: loginConstants.LOGIN_REQUEST,
      user
    };
  }

  /**
   * Login success action creator
   * @param {object} user User login request DTO
   */
  function success(user) {
    return {
      type: loginConstants.LOGIN_SUCCESS,
      user
    };
  }

  /**
   * Login error action creator
   * @param {string} error Error message
   */
  function error(error) {
    return {
      type: loginConstants.LOGIN_ERROR,
      error
    };
  }
}

/**
 * Redux action creator, performs logout
 */
function logout() {
  accountService.logout();
  actionHelper.redirectToRoot();
  return {
    type: loginConstants.LOGOUT
  };
}
