import { toastr } from "react-redux-toastr";
import { utils } from "./utils.helper";

/** Contains helper functions for using in app actions */
export const actionHelper = {
  /** Universal internal server error response handler */
  handleInternalServerErrorResponse
};

/**
 * Universal internal server error response handler
 * @param {Promise} response Server response
 * @param {Function} dispatch Function for dispatching actions
 * @param {Function} error Error action creator
 */
function handleInternalServerErrorResponse(response, dispatch, error) {
  response.json().then(internalServerErrorData => {
    const { message, description } = internalServerErrorData;
    let errorMessage;
    if (utils.isUndefinedOrEmpty(description)) {
      errorMessage = message;
    } else {
      errorMessage = `${message}: ${description}`;
    }

    dispatch(
      error({
        internalServerError: errorMessage
      })
    );
    toastr.error("Error", errorMessage);
  });
}
