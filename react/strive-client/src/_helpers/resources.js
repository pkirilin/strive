import {
  labelResources,
  placeholderResources,
  linkResources,
  inputValuesResources
} from "../_resources";

/** Gets current culture and returns resources for this culture */
export const getResourcesForCurrentCulture = () => {
  // TODO: get this from cookies
  let curCulture = "en";

  return {
    labelResources: labelResources[curCulture],
    placeholderResources: placeholderResources[curCulture],
    linkResources: linkResources[curCulture],
    inputValuesResources: inputValuesResources[curCulture]
  };
};
