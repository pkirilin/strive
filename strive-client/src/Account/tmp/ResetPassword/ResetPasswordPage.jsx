import React from "react";
import {
  AppHeader,
  PublicLayout,
  DocumentTitleSetter
} from "../../../_components";
import { ResetPasswordForm } from "./ResetPasswordForm";

export class ResetPasswordPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter>
        <PublicLayout>
          <AppHeader>Password change</AppHeader>
          <ResetPasswordForm />
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
