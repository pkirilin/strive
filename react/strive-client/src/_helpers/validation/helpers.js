/** Additional validation functions */
export const validationHelpers = {
  /** Focuses first invalid input field inside form with target selector */
  focusFirstInvalidField
};

/** Focuses first invalid input field inside form with target selector
 *
 * @returns {boolean}
 * true: at least one invalid field was found,
 * false: no invalid fields were found
 */
function focusFirstInvalidField(formSelector) {
  let invalidElem = document.querySelector(`${formSelector} .is-invalid`);
  if (invalidElem !== null) {
    invalidElem.focus();
    return true;
  }
  return false;
}
