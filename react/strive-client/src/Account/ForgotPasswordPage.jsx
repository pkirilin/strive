import React from "react";
import { CenteredFormLayout, MainTitle, MarginedLayout } from "../_components";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { BRAND_NAME } from "../_constants";
import { titleResources } from "../_resources";

export class ForgotPasswordPage extends React.Component {
  componentWillMount() {
    document.title = `${BRAND_NAME} - ${titleResources.forgotPassword}`;
  }

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
