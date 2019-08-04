import React from "react";
import {
  AppHeader,
  PublicLayout,
  DocumentTitleSetter,
  AppSectionSeparator
} from "../../../_components";
import { config } from "../../../_helpers";
import RegisterFormContainer from "../RegisterFormContainer";

export default class RegisterPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter values={["Register"]}>
        <PublicLayout>
          <AppSectionSeparator>
            <AppHeader>Sign up to {config.brandName}</AppHeader>
          </AppSectionSeparator>
          <AppSectionSeparator separatorValue="5">
            <div className="row d-flex justify-content-center">
              <div className="col-md-6 col-sm-8 col">
                <RegisterFormContainer />
              </div>
            </div>
          </AppSectionSeparator>
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
