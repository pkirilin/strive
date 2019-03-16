/** Additional validation functions */
export const validationHelpers = {
  /** Focuses first invalid input field inside form with target selector */
  focusFirstInvalidField
};

/** Focuses first invalid input field inside form with target selector */
function focusFirstInvalidField(formSelector) {
  let invalidElem = document.querySelector(`${formSelector} .is-invalid`);
  if (invalidElem !== null) {
    invalidElem.focus();
  }
}
