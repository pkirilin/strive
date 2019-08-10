import React from "react";
import { DocumentTitleSetter, Header, PublicLayout } from "../../_components";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export class ForgotPasswordPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter values={["Forgot password?"]}>
        <PublicLayout>
          <Header>Forgot password?</Header>
          <ForgotPasswordForm />
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
