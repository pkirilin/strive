import { modalConstants, modalTypes } from "../_constants";

/** Contains Redux action creators for application modals actions */
export const modalActions = {
  /** Redux action creator, closes any opened modal */
  close,
  /** Redux action creator, opens confirmation modal */
  openConfirmation
};

/** Redux action creator for closing any opened modal */
function close() {
  return {
    type: modalConstants.CLOSE
  };
}

/** Redux action creator, opens confirmation modal */
function openConfirmation() {
  return {
    type: modalConstants.OPEN_CONFIRMATION,
    modalType: modalTypes.CONFIRMATION
  };
}
