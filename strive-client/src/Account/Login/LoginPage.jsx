import React from "react";
import {
  DocumentTitleSetter,
  AppHeader,
  PublicLayout
} from "../../_components";
import { config } from "../../_helpers";
import { LoginForm } from "./LoginForm";

export class LoginPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter values={["Login"]}>
        <PublicLayout>
          <AppHeader>Sign in to {config.brandName}</AppHeader>
          <LoginForm />
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
