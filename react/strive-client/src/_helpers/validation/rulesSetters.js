import { validationRules } from "./rules";
import { validationResources } from "../../_resources";

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

  /*
   * Sets all nessesary validation rules for checking password
   * and compare it to target value
   */
  validatePasswordConfirm
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

/*
 * Sets all nessesary validation rules for checking password
 */
function validatePassword(passwordValue) {
  // TODO: Add more validation rules
  return validationRules.multiple([
    validationRules.required(
      passwordValue,
      validationResources.invalid.password.required.message
    )
  ]);
}

/*
 * Sets all nessesary validation rules for checking password and compare it to target value
 */
function validatePasswordConfirm(passwordConfirmValue, compareValue) {
  // TODO: Add more validation rules
  return validationRules.multiple([
    validationRules.required(
      passwordConfirmValue,
      validationResources.invalid.passwordConfirm.required.message
    ),
    validationRules.compare(
      passwordConfirmValue,
      compareValue,
      validationResources.invalid.passwordConfirm.compare.message
    )
  ]);
}

/*
 * Sets all nessesary validation rules for checking username/login
 */
function validateUsername(usernameValue) {
  return validationRules.multiple([
    validationRules.required(
      usernameValue,
      validationResources.invalid.username.required.message
    )
  ]);
}
