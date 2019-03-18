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
      lengthMin: {
        min: 4,
        message: "Email length is too short"
      },
      lengthMax: {
        max: 255,
        message: "Email length is too long"
      },
      email: {
        message: "Email format is incorrect"
      }
    },
    password: {
      required: {
        message: "Password is required"
      }
    }
  }
};
