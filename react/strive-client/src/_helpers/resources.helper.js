import {
  accountDocumentTitleResources,
  getAccountLoginResources,
  getAccountForgotPasswordResources
} from "../_resources/Account";

/** Gets current culture and returns resources for this culture */
export function getResources() {
  // TODO: get this from cookies
  let culture = "en";

  return {
    account: {
      documentTitles: accountDocumentTitleResources,
      login: getAccountLoginResources(culture),
      register: "",
      forgotPassword: getAccountForgotPasswordResources(culture)
    }
  };
}
