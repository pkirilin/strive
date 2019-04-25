import { getAppNavbarResources } from "../_resources/_app";
import {
  accountDocumentTitleResources,
  getAccountLoginResources,
  getAccountRegisterResources,
  getAccountForgotPasswordResources
} from "../_resources/Account";

/** Gets current culture and returns resources for this culture */
export function getResources() {
  // TODO: get this from cookies
  let culture = "en";

  return {
    app: {
      navbar: getAppNavbarResources(culture)
    },
    account: {
      documentTitles: accountDocumentTitleResources[culture],
      login: getAccountLoginResources(culture),
      register: getAccountRegisterResources(culture),
      forgotPassword: getAccountForgotPasswordResources(culture)
    }
  };
}
