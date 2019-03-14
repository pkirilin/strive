/**
 * Provides constants for valid and invalid validation parameters
 */
export const validationResources = {
  valid: {},
  invalid: {
    email: {
      required: {
        message: "Email is required"
      },
      lengthRange: {
        min: 3,
        max: 50,
        message: "Email length must be from 3 to 50"
      }
    }
  }
};
