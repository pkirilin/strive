import React from "react";
import {
  AppHeader,
  PublicLayout,
  DocumentTitleSetter
} from "../../_components";
import { config } from "../../_helpers";
import { RegisterForm } from "./RegisterForm";

export class RegisterPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter values={["Register"]}>
        <PublicLayout>
          <AppHeader>Sign up to {config.brandName}</AppHeader>
          <RegisterForm />
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
