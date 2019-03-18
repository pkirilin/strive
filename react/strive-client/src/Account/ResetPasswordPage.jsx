import React from "react";
import { CenteredFormLayout, MainTitle, MarginedLayout } from "../_components";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { BRAND_NAME } from "../_constants";
import { titleResources } from "../_resources";

export class ResetPasswordPage extends React.Component {
  componentWillMount() {
    document.title = `${BRAND_NAME} - ${titleResources.resetPassword}`;
  }

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
