import { getAppNavbarResources } from "../_resources/_app";
import {
  errorPagesDocumentTitleResources,
  getErrorPagesNotFoundResources
} from "../_resources/ErrorPages";
import {
  accountDocumentTitleResources,
  getAccountLoginResources,
  getAccountRegisterResources,
  getAccountForgotPasswordResources
} from "../_resources/Account";
import {
  homeDocumentTitleResources,
  getHomeDefaultResources
} from "../_resources/Home";

/** Gets current culture and returns resources for this culture */
export function getResources() {
  // TODO: get this from cookies
  let culture = "en";

  return {
    app: {
      navbar: getAppNavbarResources(culture)
    },
    errorPages: {
      documentTitles: errorPagesDocumentTitleResources[culture],
      notFound: getErrorPagesNotFoundResources(culture)
    },
    account: {
      documentTitles: accountDocumentTitleResources[culture],
      login: getAccountLoginResources(culture),
      register: getAccountRegisterResources(culture),
      forgotPassword: getAccountForgotPasswordResources(culture)
    },
    home: {
      documentTitles: homeDocumentTitleResources[culture],
      _default: getHomeDefaultResources(culture)
    }
  };
}
