import React from "react";
import {
  Header,
  PublicLayout,
  DocumentTitleSetter
} from "../../../_components";
import { SignUpForm } from "./SignUpForm";

export class SignUpPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter>
        <PublicLayout>
          <Header>Sign up to Strive</Header>
          <SignUpForm />
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
