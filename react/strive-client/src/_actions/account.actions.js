import { accountConstants } from "../_constants";
import { accountService } from "../_services";
//import { history } from "../_helpers";
import { alertActions } from "../_actions";

export const accountActions = {
  register
};

function register(user) {
  return dispatch => {
    dispatch(regRequest(user));
    accountService.register(user).then(
      userResponse => {
        // 200
        // 400
        dispatch(regSuccess(userResponse));
        //history.push("/login");
      },
      errorResponse => {
        dispatch(regError(errorResponse));
        dispatch(alertActions.error("Testing alertActions.error"));
      }
    );
  };

  function regRequest(user) {
    return {
      type: accountConstants.REGISTER_REQUEST,
      user
    };
  }
  function regSuccess(user) {
    return {
      type: accountConstants.REGISTER_SUCCESS,
      user
    };
  }
  function regError(error) {
    return {
      type: accountConstants.REGISTER_ERROR,
      error
    };
  }
}
