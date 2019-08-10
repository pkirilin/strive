import React from "react";
import {
  Header,
  PublicLayout,
  DocumentTitleSetter
} from "../../../_components";
import { ResetPasswordForm } from "./ResetPasswordForm";

export class ResetPasswordPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter>
        <PublicLayout>
          <Header>Password change</Header>
          <ResetPasswordForm />
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
