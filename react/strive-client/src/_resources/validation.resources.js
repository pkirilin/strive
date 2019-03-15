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
        min: 4,
        max: 255,
        message: "Email length must be from 4 to 255"
      },
      email: {
        message: "Email format is incorrect"
      }
    }
  }
};
