/** Frequently used common methods */
export const commonHelpers = {
  isUndefinedOrEmpty
};

/**
 * Checks if value undefined or empty string
 * @param {string} value
 */
function isUndefinedOrEmpty(value) {
  return value === undefined || value === "";
}
