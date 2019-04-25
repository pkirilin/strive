import React from "react";
import { PrivateLayout, PageTitle } from "../_components";
import {
  config
  //, getResources
} from "../_helpers";
import Cookies from "js-cookie";

export class Home extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.resources = getResources();
  // }

  componentWillMount() {
    //let { documentTitles } = this.resources.home._default;
    document.title = `${config.brandName} - Home`;
  }

  render() {
    const userFromStorage = Cookies.getJSON(config.cookies.user.keyName);
    return (
      <PrivateLayout>
        <PageTitle>Home</PageTitle>
        <div className="text-center m-3">
          Signed in as {userFromStorage.username}
        </div>
      </PrivateLayout>
    );
  }
}
