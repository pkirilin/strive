import React from "react";
import { PrivateLayout, MainTitle } from "../_components";
import { getResourcesForCurrentCulture, config } from "../_helpers";
import Cookies from "js-cookie";

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: getResourcesForCurrentCulture()
    };
  }

  componentWillMount() {
    document.title = `${config.brandName} - ${this.state.resources.title.home}`;
  }

  render() {
    const userFromStorage = Cookies.getJSON(config.cookies.user.keyName);
    return (
      <PrivateLayout>
        <MainTitle text="Home" />
        <div className="text-center m-3">
          Signed in as {userFromStorage.username}
        </div>
      </PrivateLayout>
    );
  }
}
