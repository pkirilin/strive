import React, { Component } from "react";
import {
  DocumentTitleSetter,
  Header,
  PublicLayout,
  SectionSeparator
} from "../../../_components";
import { config } from "../../../_helpers";
import LoginFormContainer from "../LoginFormContainer";

export default class LoginPage extends Component {
  render() {
    return (
      <DocumentTitleSetter values={["Login"]}>
        <PublicLayout>
          <SectionSeparator>
            <Header>Sign in to {config.brandName}</Header>
          </SectionSeparator>
          <SectionSeparator separatorValue="5">
            <div className="row d-flex justify-content-center">
              <div className="col-md-6 col-sm-8 col">
                <LoginFormContainer />
              </div>
            </div>
          </SectionSeparator>
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
