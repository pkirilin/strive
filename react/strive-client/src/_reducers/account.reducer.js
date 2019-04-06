import { accountConstants } from "../_constants";

export const accountReducer = (state = {}, action) => {
  switch (action.type) {
    case accountConstants.REGISTER_REQUEST:
      return {};
    case accountConstants.REGISTER_SUCCESS:
      return {};
    case accountConstants.REGISTER_ERROR:
      return {};
    default:
      return state;
  }
};
