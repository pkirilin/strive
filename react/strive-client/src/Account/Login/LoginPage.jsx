import React from "react";
import {
  DocumentTitleSetter,
  AppHeader,
  PublicLayout
} from "../../_components";
import { LoginForm } from "./LoginForm";

export class LoginPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter values={["Login"]}>
        <PublicLayout>
          <AppHeader>Sign in to Strive</AppHeader>
          <LoginForm />
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
