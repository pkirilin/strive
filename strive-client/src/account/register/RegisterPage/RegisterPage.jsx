import React, { Component } from "react";
import {
  Header,
  PublicLayout,
  DocumentTitleSetter,
  SectionSeparator
} from "../../../_components";
import { config } from "../../../_helpers";
import RegisterFormContainer from "../RegisterFormContainer";

export default class RegisterPage extends Component {
  render() {
    return (
      <DocumentTitleSetter values={["Register"]}>
        <PublicLayout>
          <SectionSeparator>
            <Header>Sign up to {config.brandName}</Header>
          </SectionSeparator>
          <SectionSeparator separatorValue="5">
            <div className="row d-flex justify-content-center">
              <div className="col-md-6 col-sm-8 col">
                <RegisterFormContainer />
              </div>
            </div>
          </SectionSeparator>
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
