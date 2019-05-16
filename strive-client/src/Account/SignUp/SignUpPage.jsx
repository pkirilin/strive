import React from "react";
import {
  AppHeader,
  PublicLayout,
  DocumentTitleSetter
} from "../../_components";
import { SignUpForm } from "./SignUpForm";

export class SignUpPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter>
        <PublicLayout>
          <AppHeader>Sign up to Strive</AppHeader>
          <SignUpForm />
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
