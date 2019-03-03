import React from "react";
import { PrivateLayout, MainTitle } from "../_components";

export class Home extends React.Component {
  render() {
    return (
      <PrivateLayout>
        <MainTitle text="Home" />
      </PrivateLayout>
    );
  }
}
