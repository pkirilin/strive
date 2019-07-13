import React, { Component } from "react";
import {
  DocumentTitleSetter,
  AppHeader,
  PublicLayout,
  AppSectionSeparator
} from "../../../_components";
import { config } from "../../../_helpers";
import LoginFormContainer from "../containers/LoginFormContainer";

export default class LoginPage extends Component {
  render() {
    return (
      <DocumentTitleSetter values={["Login"]}>
        <PublicLayout>
          <AppSectionSeparator>
            <AppHeader>Sign in to {config.brandName}</AppHeader>
          </AppSectionSeparator>
          <AppSectionSeparator separatorValue="5">
            <div className="row d-flex justify-content-center">
              <div className="col-md-6 col-sm-8 col">
                <LoginFormContainer />
              </div>
            </div>
          </AppSectionSeparator>
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
