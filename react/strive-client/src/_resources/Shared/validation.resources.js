export const sharedValidationResources = {
  en: {
    valid: {},
    invalid: {
      email: {
        required: {
          message: "Email is required"
        },
        lengthMin: {
          min: 4,
          message: "Email is too short"
        },
        lengthMax: {
          max: 255,
          message: "Email is too long"
        },
        email: {
          message: "Email format is incorrect"
        }
      },
      username: {
        required: {
          message: "Username is required"
        }
      },
      password: {
        required: {
          message: "Password is required"
        }
      },
      passwordConfirm: {
        required: {
          message: "Password confirmation is required"
        },
        compare: {
          message: "Passwords are mismatch"
        }
      }
    }
  }
};
