/**
 * Validation statuses
 *
 * default - no highlighting
 * valid - highlights as valid ("green") field
 * invalid - highlights as invalid ("red") field
 */
export const validationStatuses = {
  default: "default",
  valid: "valid",
  invalid: "invalid"
};

/**
 * Validation rules functions collected in single object
 */
export const validationRules = {
  /** Validation rule function for checking empty fields */
  required,

  /** Validation rule function for checking field's value length ranges */
  lengthRange,

  /** Validation rule function for checking multiple validation rules applied to field */
  multiple
};

function required(
  value,
  invalidMessage = "Value is required",
  validMessage = ""
) {
  if (value === "") {
    return {
      status: validationStatuses.invalid,
      message: invalidMessage
    };
  }
  return {
    status: validationStatuses.valid,
    message: validMessage
  };
}

function lengthRange(
  value,
  minLength = 0,
  maxLength = 50,
  invalidMessage = "",
  validMessage = ""
) {
  if (value.length >= minLength && value.length <= maxLength) {
    return {
      status: validationStatuses.valid,
      message: validMessage
    };
  }

  return {
    status: validationStatuses.invalid,
    message: invalidMessage
  };
}

function multiple(rules) {
  for (let i = 0; i < rules.length; i++) {
    if (rules[i].status === validationStatuses.invalid) {
      return rules[i];
    }
  }
  return rules[rules.length - 1];
}
