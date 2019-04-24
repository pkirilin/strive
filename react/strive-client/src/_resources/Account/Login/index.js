import { accountLoginAlertResources } from "./alert.resources";
import { accountLoginButtonResources } from "./button.resources";
import { accountLoginLabelResources } from "./label.resources";
import { accountLoginLinkResources } from "./link.resources";
import { accountLoginPlaceholderResources } from "./placeholder.resources";
import { accountLoginTitleResources } from "./title.resources";

export function getAccountLoginResources(culture) {
  return {
    alerts: accountLoginAlertResources[culture],
    buttons: accountLoginButtonResources[culture],
    labels: accountLoginLabelResources[culture],
    links: accountLoginLinkResources[culture],
    placeholders: accountLoginPlaceholderResources[culture],
    titles: accountLoginTitleResources[culture]
  };
}
