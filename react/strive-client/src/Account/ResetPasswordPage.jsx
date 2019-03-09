import React from "react";
import { CenteredFormLayout, MainTitle, MarginedLayout } from "../_components";
import { ResetPasswordForm } from "./ResetPasswordForm";

export class ResetPasswordPage extends React.Component {
  render() {
    return (
      <div>
        <MainTitle text="Password change" />
        <MarginedLayout>
          <CenteredFormLayout>
            <ResetPasswordForm />
          </CenteredFormLayout>
        </MarginedLayout>
      </div>
    );
  }
}
