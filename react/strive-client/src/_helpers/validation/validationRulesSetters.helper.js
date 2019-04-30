import { validationRules } from "./validationRules.helper";

/*
 * Contains functions for setting validation rules.
 * Each function returns appropriate validationState
 */
export const validationRulesSetters = {
  /** Resets all validation rules */
  resetAll,

  /** Sets all nessesary validation rules for checking email */
  validateEmail,

  /** Sets all nessesary validation rules for checking username/login  */
  validateUsername,

  /** Sets all nessesary validation rules for checking password */
  validatePassword,

  /** Sets all nessesary validation rules for checking password and comparing it to target value */
  validatePasswordConfirm,

  /** Sets all nessesary validation rules for checking project name's correct value */
  validateProjectName,

  /** Sets all nessesary validation rules for checking project description's correct value */
  validateProjectDescription
};

/*
 * Resets all validation rules
 */
function resetAll() {
  return validationRules.novalidate();
}

/*
 *  Sets all nessesary validation rules for checking email
 */
function validateEmail(emailValue, resources) {
  return validationRules.multiple([
    validationRules.required(
      emailValue,
      resources.validation.invalid.email.required.message
    ),
    validationRules.lengthMin(
      emailValue,
      resources.validation.invalid.email.lengthMin.min,
      resources.validation.invalid.email.lengthMin.message
    ),
    validationRules.lengthMax(
      emailValue,
      resources.validation.invalid.email.lengthMax.max,
      resources.validation.invalid.email.lengthMax.message
    ),
    validationRules.email(
      emailValue,
      resources.validation.invalid.email.email.message
    )
  ]);
}

/*
 * Sets all nessesary validation rules for checking password
 */
function validatePassword(passwordValue, resources) {
  // TODO: Add more validation rules
  return validationRules.multiple([
    validationRules.required(
      passwordValue,
      resources.validation.invalid.password.required.message
    )
  ]);
}

/*
 * Sets all nessesary validation rules for checking password and compare it to target value
 */
function validatePasswordConfirm(
  passwordConfirmValue,
  compareValue,
  resources
) {
  // TODO: Add more validation rules
  return validationRules.multiple([
    validationRules.required(
      passwordConfirmValue,
      resources.validation.invalid.passwordConfirm.required.message
    ),
    validationRules.compare(
      passwordConfirmValue,
      compareValue,
      resources.validation.invalid.passwordConfirm.compare.message
    )
  ]);
}

/*
 * Sets all nessesary validation rules for checking username/login
 */
function validateUsername(usernameValue, resources) {
  return validationRules.multiple([
    validationRules.required(
      usernameValue,
      resources.validation.invalid.username.required.message
    )
  ]);
}

/**
 * Sets all nessesary validation rules for checking project name's correct value
 */
function validateProjectName(projectNameValue, resources) {
  return validationRules.multiple([
    validationRules.required(projectNameValue, "Project name is required"),
    validationRules.lengthMin(projectNameValue, 3, "Project name is too short"),
    validationRules.lengthMax(projectNameValue, 255, "Project name is too long")
  ]);
}

/**
 * Sets all nessesary validation rules for checking project description's correct value
 */
function validateProjectDescription(projectDescriptionValue, resources) {
  return validationRules.multiple([
    validationRules.lengthMax(
      projectDescriptionValue,
      511,
      "Project description is too long"
    )
  ]);
}