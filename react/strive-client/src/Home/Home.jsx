import React from "react";
import { PrivateLayout, PageTitle, DocumentTitleSetter } from "../_components";
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

  render() {
    const userFromStorage = Cookies.getJSON(config.cookies.user.keyName);
    return (
      <DocumentTitleSetter values={["Home"]}>
        <PrivateLayout>
          <PageTitle>Home</PageTitle>
          <div className="text-center m-3">
            Signed in as {userFromStorage.username}
          </div>
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
