import React from "react";
import {
  AppHeader,
  PublicLayout,
  DocumentTitleSetter
} from "../../_components";
import { RegisterForm } from "./RegisterForm";

export class RegisterPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter values={["Register"]}>
        <PublicLayout>
          <AppHeader>Sign up to Strive</AppHeader>
          <RegisterForm />
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
