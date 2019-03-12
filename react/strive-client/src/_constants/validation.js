// --
export const validationStates = {
  default: "default",
  valid: "valid",
  invalid: "invalid"
};

// --
export const validationRules = {
  required
};

// --
function required(
  value,
  invalidMessage = "Value is required",
  validMessage = ""
) {
  if (value === "") {
    return {
      status: validationStates.invalid,
      message: invalidMessage
    };
  }
  return {
    status: validationStates.valid,
    message: validMessage
  };
}
