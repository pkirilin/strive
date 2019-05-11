import React from "react";
import {
  PageTitle,
  PublicLayout,
  DocumentTitleSetter
} from "../../_components";
import { ResetPasswordForm } from "./ResetPasswordForm";

export class ResetPasswordPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter>
        <PublicLayout>
          <PageTitle>Password change</PageTitle>
          <ResetPasswordForm />
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
