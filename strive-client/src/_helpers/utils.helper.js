/** Frequently used common methods */
export const utils = {
  /** Checks if value undefined or empty string */
  isUndefinedOrEmpty
};

/**
 * Checks if value undefined or empty string
 * @param {string} value
 */
function isUndefinedOrEmpty(value) {
  return value === undefined || value === "";
}
