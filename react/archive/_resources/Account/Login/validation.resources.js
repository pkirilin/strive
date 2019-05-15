import { sharedValidationResources } from "../../Shared";

export const validationResources = {
  en: {
    valid: {},
    invalid: {
      email: {
        ...sharedValidationResources["en"].invalid.email
      },
      password: {
        ...sharedValidationResources["en"].invalid.password
      }
    }
  }
};
