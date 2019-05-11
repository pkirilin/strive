import React from "react";
import {
  PageTitle,
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
          <SignUpForm />
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
