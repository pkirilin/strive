import {
  titleResources,
  labelResources,
  placeholderResources,
  linkResources,
  inputValuesResources,
  helpResources,
  validationResources
} from "../_resources";

/** Gets current culture and returns resources for this culture */
export const getResourcesForCurrentCulture = () => {
  // TODO: get this from cookies
  let curCulture = "en";

  return {
    title: titleResources[curCulture],
    label: labelResources[curCulture],
    placeholder: placeholderResources[curCulture],
    link: linkResources[curCulture],
    inputValues: inputValuesResources[curCulture],
    help: helpResources[curCulture],
    validation: validationResources[curCulture]
  };
};
