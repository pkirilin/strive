import React from "react";
import {
  CenteredFormLayout,
  PageTitle,
  MarginedLayout
} from "../../_components";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { config } from "../../_helpers";

export class ResetPasswordPage extends React.Component {
  componentWillMount() {
    document.title = `${config.brandName} - Reset password`;
  }

  render() {
    return (
      <div>
        <PageTitle>Password change</PageTitle>
        <MarginedLayout>
          <CenteredFormLayout>
            <ResetPasswordForm />
          </CenteredFormLayout>
        </MarginedLayout>
      </div>
    );
  }
}
