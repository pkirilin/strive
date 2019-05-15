import { buttonResources } from "./button.resources";

export function getAppNavbarResources(culture) {
  return {
    buttons: buttonResources[culture]
  };
}
