import React from "react";
import { PrivateLayout, MainTitle } from "../_components";
import { BRAND_NAME } from "../_constants";
import { getResourcesForCurrentCulture } from "../_helpers";

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: getResourcesForCurrentCulture()
    };
  }

  componentWillMount() {
    document.title = `${BRAND_NAME} - ${
      this.state.resources.titleResources.home
    }`;
  }

  render() {
    return (
      <PrivateLayout>
        <MainTitle text="Home" />
      </PrivateLayout>
    );
  }
}
