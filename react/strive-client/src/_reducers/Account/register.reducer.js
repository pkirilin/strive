import { registerConstants } from "../../_constants";

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case registerConstants.REGISTER_REQUEST:
      return { registering: true };
    case registerConstants.REGISTER_SUCCESS:
      return {};
    case registerConstants.REGISTER_ERROR:
      return {};
    default:
      return state;
  }
};
