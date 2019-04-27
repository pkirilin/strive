import { modalConstants } from "../_constants";

const initialState = {
  isOpen: false
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case modalConstants.CLOSE:
      return {
        isOpen: false
      };
    case modalConstants.OPEN_CONFIRMATION:
      return {
        isOpen: true,
        modalType: action.modalType
      };
    default:
      return state;
  }
};
