import React from "react";
import {
  CenteredFormLayout,
  PageTitle,
  MarginedLayout,
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
          <MarginedLayout>
            <CenteredFormLayout>
              <ResetPasswordForm />
            </CenteredFormLayout>
          </MarginedLayout>
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
