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
  validateProjectDescription,

  /** Sets all nessesary validation rules for checking task title's correct value */
  validateTaskName,

  /** Sets all nessesary validation rules for checking task description's correct value */
  validateTaskDescription
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
function validateEmail(emailValue) {
  return validationRules.multiple([
    validationRules.required(emailValue, "Email is required"),
    validationRules.lengthMin(emailValue, 4, "Email is too short"),
    validationRules.lengthMax(emailValue, 255, "Email is too long"),
    validationRules.email(emailValue, "Email format is incorrect")
  ]);
}

/*
 * Sets all nessesary validation rules for checking password
 */
function validatePassword(passwordValue) {
  // TODO: Add more validation rules
  return validationRules.multiple([
    validationRules.required(passwordValue, "Password is required"),
    validationRules.lengthMin(passwordValue, 4, "Password is too short"),
    validationRules.lengthMax(passwordValue, 16, "Password is too long")
  ]);
}

/*
 * Sets all nessesary validation rules for checking password and compare it to target value
 */
function validatePasswordConfirm(
  passwordConfirmValue,
  compareValue,
  compareValidationStatus
) {
  // TODO: Add more validation rules
  return validationRules.multiple([
    validationRules.required(
      passwordConfirmValue,
      "Password confirmation is required"
    ),
    validationRules.compare(
      passwordConfirmValue,
      compareValue,
      compareValidationStatus,
      "Passwords are mismatch"
    )
  ]);
}

/*
 * Sets all nessesary validation rules for checking username/login
 */
function validateUsername(usernameValue) {
  return validationRules.multiple([
    validationRules.required(usernameValue, "Username is required"),
    validationRules.username(
      usernameValue,
      "Username must contain from 4 to 20 symbols. Allowed symbols: alphanumeric characters, underscores (_) and dots (.). Numeric character can't be at the start of a username. Underscore and dot can't be at the end or start of a username. Underscore and dot can't be next to each other. Underscore or dot can't be used multiple times in a row"
    )
  ]);
}

/**
 * Sets all nessesary validation rules for checking project name's correct value
 */
function validateProjectName(projectNameValue) {
  return validationRules.multiple([
    validationRules.required(projectNameValue, "Project name is required"),
    validationRules.lengthMin(projectNameValue, 3, "Project name is too short"),
    validationRules.lengthMax(projectNameValue, 255, "Project name is too long")
  ]);
}

/**
 * Sets all nessesary validation rules for checking project description's correct value
 */
function validateProjectDescription(projectDescriptionValue) {
  return validationRules.multiple([
    validationRules.lengthMax(
      projectDescriptionValue,
      511,
      "Project description is too long"
    )
  ]);
}

/** Sets all nessesary validation rules for checking task title's correct value */
function validateTaskName(taskNameValue) {
  return validationRules.multiple([
    validationRules.required(taskNameValue, "Task title is required"),
    validationRules.lengthMin(taskNameValue, 3, "Task title is too short"),
    validationRules.lengthMax(taskNameValue, 255, "Task title is too long")
  ]);
}

/** Sets all nessesary validation rules for checking task description's correct value */
function validateTaskDescription(taskDescriptionValue) {
  return validationRules.multiple([
    validationRules.lengthMax(
      taskDescriptionValue,
      511,
      "Project description is too long"
    )
  ]);
}
