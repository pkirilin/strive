import React from "react";
import {
  DocumentTitleSetter,
  AppHeader,
  PublicLayout
} from "../../_components";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export class ForgotPasswordPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter values={["Forgot password?"]}>
        <PublicLayout>
          <AppHeader>Forgot password?</AppHeader>
          <ForgotPasswordForm />
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
