import { validationRules } from "./rules";
import { validationResources } from "../../_resources";

/*
 * Contains functions for setting validation rules.
 * Each function returns appropriate validationState
 */
export const validationRulesSetters = {
  /** Sets all nessesary validation rules for checking email */
  validateEmail,

  /** Sets all nessesary validation rules for checking password */
  validatePassword
};

/** Sets all nessesary validation rules for checking email */
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

/**
 * Sets all nessesary validation rules for checking password and returns validation state
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
