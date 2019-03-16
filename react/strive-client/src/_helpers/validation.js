import { validationStatuses, validationRegexes } from "../_constants";
import { validationResources } from "../_resources";

/**
 * Validation rules functions collected in single object
 */
export const validationRules = {
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

  /** Validation rule function for checking multiple validation rules applied to field */
  multiple
};

/** Additional validation functions */
export const validationHelpers = {
  /** Focuses first invalid input field inside form with target selector */
  focusFirstInvalidField
};

export const validationRulesSetters = {
  validateEmail
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

function email(value, invalidMessage = "", validMessage = "") {
  return regularExpression(
    value,
    validationRegexes.EMAIL,
    invalidMessage,
    validMessage
  );
}

function multiple(rules) {
  for (let i = 0; i < rules.length; i++) {
    if (rules[i].status === validationStatuses.invalid) {
      return rules[i];
    }
  }
  return rules[rules.length - 1];
}

function focusFirstInvalidField(formSelector) {
  let invalidElem = document.querySelector(`${formSelector} .is-invalid`);
  if (invalidElem !== null) {
    invalidElem.focus();
  }
}

function validateEmail(emailValue) {
  return validationRules.multiple([
    validationRules.required(
      emailValue,
      validationResources.invalid.email.required.message
    ),
    validationRules.lengthMin(
      emailValue,
      validationResources.invalid.email.lengthMin.min,
      validationResources.invalid.email.lengthMin.message
    ),
    validationRules.lengthMax(
      emailValue,
      validationResources.invalid.email.lengthMax.max,
      validationResources.invalid.email.lengthMax.message
    ),
    validationRules.email(
      emailValue,
      validationResources.invalid.email.email.message
    )
  ]);
}
