import React from "react";
import { PrivateLayout, MainTitle } from "../_components";
import { getResourcesForCurrentCulture, config } from "../_helpers";

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: getResourcesForCurrentCulture()
    };
  }

  componentWillMount() {
    document.title = `${config.brandName} - ${
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
