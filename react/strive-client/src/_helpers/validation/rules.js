import { validationStatuses, validationRegexes } from "../../_constants";
import { commonHelpers } from "../common";

/**
 * Validation rules functions collected in single object
 */
export const validationRules = {
  /** No validation rule */
  novalidate,

  /** Validation rule function for checking empty fields */
  required,

  /** Validation rule function for checking field's value min length */
  lengthMin,

  /** Validation rule function for checking field's value max length */
  lengthMax,

  /** Validation rule function for checking whether field match target regular expression or not */
  regularExpression,

  /** Validation rule function for checking email address */
  email,

  /** Validation rule function for checking whether origin value is the same as compare value */
  compare,

  /** Validation rule function for checking multiple validation rules applied to field */
  multiple
};

/** No validation rule */
function novalidate() {
  return {
    status: validationStatuses.default
  };
}

/** Validation rule function for checking empty fields */
function required(value, invalidMessage = "", validMessage = "") {
  if (commonHelpers.isUndefinedOrEmpty(value)) {
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

/** Validation rule function for checking field's value min length */
function lengthMin(value, min = 0, invalidMessage = "", validMessage = "") {
  if (value.length < min) {
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

/** Validation rule function for checking field's value max length */
function lengthMax(value, max = 255, invalidMessage = "", validMessage = "") {
  if (value.length > max) {
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

/** Validation rule function for checking whether field match target regular expression or not */
function regularExpression(
  value,
  expression,
  invalidMessage = "Value doesn't match target regular expression",
  validMessage = ""
) {
  if (value.match(expression) === null) {
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

/** Validation rule function for checking email address */
function email(value, invalidMessage = "", validMessage = "") {
  return regularExpression(
    value,
    validationRegexes.EMAIL,
    invalidMessage,
    validMessage
  );
}

/** Validation rule function for checking whether origin value is the same as compare value */
function compare(
  originValue,
  compareValue,
  invalidMessage = "",
  validMessage = ""
) {
  if (originValue === compareValue) {
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

/*
 * Validation rule function for checking multiple validation rules applied to field
 *
 * Rules are applied until the first invalid one.
 * The priorities are based on the rules' definition order.
 */
function multiple(rules) {
  for (let i = 0; i < rules.length; i++) {
    if (rules[i].status === validationStatuses.invalid) {
      return rules[i];
    }
  }
  return rules[rules.length - 1];
}
