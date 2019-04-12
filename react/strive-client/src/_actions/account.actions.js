import { registerConstants } from "../_constants";
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
  register
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
          dispatch(regBadRequest(badRequestJsonData));
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
