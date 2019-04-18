import { registerConstants, loginConstants } from "../_constants";
import { accountService } from "../_services";
import {
  getResourcesForCurrentCulture,
  httpStatuses,
  history
} from "../_helpers";
import { alertActions } from "../_actions";

const resources = getResourcesForCurrentCulture();

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
    dispatch(regRequest(user));
    accountService
      .register(user)
      .then(
        // Server is available
        userResponse => {
          switch (userResponse.status) {
            case httpStatuses.ok:
              dispatch(regSuccess(userResponse));
              history.push("/account/login");
              dispatch(
                alertActions.success(resources.alert.accountRegisterSuccess)
              );
              break;
            case httpStatuses.badRequest:
              return userResponse.json();
            default:
              dispatch(regError(""));
              dispatch(alertActions.clear());
              break;
          }
        },
        // Server is not available
        errorResponse => {
          dispatch(regError(errorResponse));
          dispatch(
            alertActions.error(resources.alert.accountRegisterFailedToFetch)
          );
        }
      )
      .then(
        // Server returned register validation error(s)
        badRequestJsonData => {
          if (badRequestJsonData !== undefined) {
            // If there's something returned from server
            dispatch(regBadRequest(badRequestJsonData));
          }
        }
      );
  };

  /**
   * Register request action creator
   * @param {object} user User register DTO
   */
  function regRequest(user) {
    return {
      type: registerConstants.REGISTER_REQUEST,
      user
    };
  }

  /**
   * Register success action creator
   * @param {object} user User register DTO
   */
  function regSuccess(user) {
    return {
      type: registerConstants.REGISTER_SUCCESS,
      user
    };
  }

  /**
   * Register error action creator
   * @param {string} error Error message
   */
  function regError(error) {
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
  return dispatch => {
    dispatch(request(userLoginData));
    accountService.login(userLoginData).then(
      // Server is available
      userResponse => {
        switch (userResponse.status) {
          case undefined:
            // undefined means that API returned an Ok with plain object, is has no status
            dispatch(success(userResponse));
            history.push("/");
            break;
          case httpStatuses.unauthorized:
            dispatch(error(resources.alert.accountLoginUnauthorized));
            dispatch(
              alertActions.error(resources.alert.accountLoginUnauthorized)
            );
            break;
          default:
            dispatch(error(""));
            dispatch(alertActions.clear());
            break;
        }
      },
      // Server is not available
      errorResponse => {
        dispatch(error(errorResponse));
        dispatch(alertActions.error(resources.alert.accountLoginFailedToFetch));
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
  history.push("/");
  return {
    type: loginConstants.LOGOUT
  };
}
