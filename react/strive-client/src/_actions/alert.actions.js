import { alertConstants } from "../_constants";

/** Contains Redux action creators for application alerts actions */
export const alertActions = {
  /** Redux action creator, returns alert success action */
  success,
  error,
  clear
};

/**
 * Redux action creator, returns alert success action
 * @param {string} message Alert message to be displayed
 */
function success(message) {
  return {
    type: alertConstants.SUCCESS,
    message
  };
}

/**
 * Redux action creator, returns alert error action
 * @param {string} message Alert message to be displayed
 */
function error(message) {
  return {
    type: alertConstants.ERROR,
    message
  };
}

/**
 * Redux action creator, returns alert clear action
 */
function clear() {
  return {
    type: alertConstants.CLEAR
  };
}
