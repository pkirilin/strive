import React from "react";
import { PrivateLayout, MainTitle } from "../_components";
import { BRAND_NAME } from "../_constants";
import { titleResources } from "../_resources";

export class Home extends React.Component {
  componentWillMount() {
    document.title = `${BRAND_NAME} - ${titleResources.home}`;
  }

  render() {
    return (
      <PrivateLayout>
        <MainTitle text="Home" />
      </PrivateLayout>
    );
  }
}
