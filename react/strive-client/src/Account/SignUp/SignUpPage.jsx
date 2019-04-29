import React from "react";
import {
  CenteredFormLayout,
  PageTitle,
  MarginedLayout,
  PublicLayout,
  DocumentTitleSetter
} from "../../_components";
import { SignUpForm } from "./SignUpForm";

export class SignUpPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter>
        <PublicLayout>
          <PageTitle>Sign up to Strive</PageTitle>
          <MarginedLayout>
            <CenteredFormLayout>
              <SignUpForm />
            </CenteredFormLayout>
          </MarginedLayout>
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
