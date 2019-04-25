import { sharedValidationResources } from "../../Shared";

export const validationResources = {
  en: {
    valid: {},
    invalid: {
      email: {
        ...sharedValidationResources["en"].invalid.email
      },
      username: {
        ...sharedValidationResources["en"].invalid.username
      },
      password: {
        ...sharedValidationResources["en"].invalid.password
      },
      passwordConfirm: {
        ...sharedValidationResources["en"].invalid.passwordConfirm
      }
    }
  }
};
