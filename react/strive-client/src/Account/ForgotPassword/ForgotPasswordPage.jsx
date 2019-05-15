import React from "react";
import {
  DocumentTitleSetter,
  PageTitle,
  PublicLayout
} from "../../_components";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export class ForgotPasswordPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter values={["Forgot password?"]}>
        <PublicLayout>
          <PageTitle>Forgot password?</PageTitle>
          <ForgotPasswordForm />
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
