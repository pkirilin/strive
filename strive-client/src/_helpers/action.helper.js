import { alertActions } from "../_actions";

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
  response.text().then(internalServerErrorMessage => {
    let errorMessage = `Internal server error. Error message: ${internalServerErrorMessage}`;
    dispatch(
      error({
        internalServerError: errorMessage
      })
    );
    dispatch(alertActions.error(errorMessage));
  });
}
