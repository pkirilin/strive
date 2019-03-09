import React from "react";
import { CenteredFormLayout, MainTitle, MarginedLayout } from "../_components";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export class ForgotPasswordPage extends React.Component {
  render() {
    return (
      <div>
        <MainTitle text="Reset your password" />
        <MarginedLayout>
          <CenteredFormLayout>
            <ForgotPasswordForm />
          </CenteredFormLayout>
        </MarginedLayout>
      </div>
    );
  }
}
