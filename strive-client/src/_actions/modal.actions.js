/** Contains Redux action creators for application modals actions */
export const modalActions = {
  /** Redux action creator, opens application modal */
  open,

  /** Redux action creator, closes application modal */
  close
};

/**
 * Redux action creator, opens application modal
 * @param {string} type Redux action type for app modal to be opened
 * @param {object} data Additional modal data
 */
function open(type, data) {
  return {
    type,
    ...data
  };
}

/**
 * Redux action creator, closes application modal
 * @param {string} type Redux action type for app modal to be closed
 */
function close(type) {
  return {
    type
  };
}
