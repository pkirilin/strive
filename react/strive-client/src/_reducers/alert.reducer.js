import { alertConstants } from "../_constants";

export const alertReducer = (state = {}, action) => {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        cssClass: "alert-success",
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        cssClass: "alert-danger",
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
};
