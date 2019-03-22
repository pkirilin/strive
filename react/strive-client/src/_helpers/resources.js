import {
  titleResources,
  labelResources,
  placeholderResources,
  linkResources,
  inputValuesResources,
  helpResources
} from "../_resources";

/** Gets current culture and returns resources for this culture */
export const getResourcesForCurrentCulture = () => {
  // TODO: get this from cookies
  let curCulture = "en";

  return {
    titleResources: titleResources[curCulture],
    labelResources: labelResources[curCulture],
    placeholderResources: placeholderResources[curCulture],
    linkResources: linkResources[curCulture],
    inputValuesResources: inputValuesResources[curCulture],
    helpResources: helpResources[curCulture]
  };
};
