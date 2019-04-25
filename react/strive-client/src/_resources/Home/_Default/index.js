import { alertResources } from "./alert.resources";
import { buttonResources } from "./button.resources";
import { contentResources } from "./content.resources";
import { helpResources } from "./help.resources";
import { labelResources } from "./label.resources";
import { linkResources } from "./link.resources";
import { placeholderResources } from "./placeholder.resources";
import { titleResources } from "./title.resources";
import { validationResources } from "./validation.resources";

export function getHomeDefaultResources(culture) {
  return {
    alerts: alertResources[culture],
    buttons: buttonResources[culture],
    contents: contentResources[culture],
    helps: helpResources[culture],
    labels: labelResources[culture],
    links: linkResources[culture],
    placeholders: placeholderResources[culture],
    titles: titleResources[culture],
    validation: validationResources[culture]
  };
}
