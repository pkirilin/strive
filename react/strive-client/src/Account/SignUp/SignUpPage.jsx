import React from "react";
import {
  CenteredFormLayout,
  PageTitle,
  MarginedLayout,
  PublicLayout
} from "../../_components";
import { config } from "../../_helpers";
import { SignUpForm } from "./SignUpForm";

export class SignUpPage extends React.Component {
  componentWillMount() {
    document.title = `${config.brandName} - Sign up`;
  }

  render() {
    return (
      <PublicLayout>
        <PageTitle>Sign up to Strive</PageTitle>
        <MarginedLayout>
          <CenteredFormLayout>
            <SignUpForm />
          </CenteredFormLayout>
        </MarginedLayout>
      </PublicLayout>
    );
  }
}
