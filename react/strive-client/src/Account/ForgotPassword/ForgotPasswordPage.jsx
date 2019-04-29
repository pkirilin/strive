import React from "react";
import {
  CenteredFormLayout,
  DocumentTitleSetter,
  PageTitle,
  MarginedLayout,
  PublicLayout
} from "../../_components";
import { getResources } from "../../_helpers";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.resources = getResources();
  }

  render() {
    let { documentTitles } = this.resources.account;
    let { titles } = this.resources.account.forgotPassword;
    return (
      <DocumentTitleSetter values={[documentTitles.forgotPassword]}>
        <PublicLayout>
          <PageTitle>{titles.pageHeader}</PageTitle>
          <MarginedLayout>
            <CenteredFormLayout>
              <ForgotPasswordForm resources={this.resources} />
            </CenteredFormLayout>
          </MarginedLayout>
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
