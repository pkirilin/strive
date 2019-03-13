// --
export const validationStates = {
  default: "default",
  valid: "valid",
  invalid: "invalid"
};

// --
export const validationRules = {
  required,
  lengthRange,
  multiple
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

// --
function lengthRange(
  value,
  minLength = 0,
  maxLength = 50,
  invalidMessage = "",
  validMessage = ""
) {
  if (value.length >= minLength && value.length <= maxLength) {
    return {
      status: validationStates.valid,
      message: validMessage
    };
  }

  return {
    status: validationStates.invalid,
    message: invalidMessage
  };
}

// --
function multiple(rules) {
  for (let i = 0; i < rules.length; i++) {
    if (rules[i].status === validationStates.invalid) {
      return rules[i];
    }
  }
  return rules[rules.length - 1];
}
