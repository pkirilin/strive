import { registerConstants } from "../_constants";
import { accountService } from "../_services";
//import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { getResourcesForCurrentCulture, httpStatuses } from "../_helpers";

const resources = getResourcesForCurrentCulture();

export const accountActions = {
  register
};

function register(user) {
  return dispatch => {
    dispatch(regRequest(user));
    accountService.register(user).then(
      userResponse => {
        switch (userResponse.status) {
          case httpStatuses.ok:
            //dispatch(regSuccess(userResponse));
            break;
          case httpStatuses.badRequest:
            dispatch(regError("register bad request"));
            dispatch(alertActions.error("register bad request"));
            break;
          default:
            //dispatch(alertActions.clear());
            break;
        }
        //history.push("/login");
      },
      errorResponse => {
        dispatch(regError(errorResponse));
        dispatch(
          alertActions.error(resources.alert.accountRegisterFailedToFetch)
        );
      }
    );
  };

  function regRequest(user) {
    return {
      type: registerConstants.REGISTER_REQUEST,
      user
    };
  }
  function regSuccess(user) {
    return {
      type: registerConstants.REGISTER_SUCCESS,
      user
    };
  }
  function regError(error) {
    return {
      type: registerConstants.REGISTER_ERROR,
      error
    };
  }
}
