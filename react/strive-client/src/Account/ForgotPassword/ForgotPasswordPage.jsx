import React from "react";
import {
  CenteredFormLayout,
  PageTitle,
  MarginedLayout,
  PublicLayout
} from "../../_components";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { config, getResources } from "../../_helpers";

export class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.resources = getResources();
  }

  componentWillMount() {
    let { documentTitles } = this.resources.account;
    document.title = `${config.brandName} - ${documentTitles.forgotPassword}`;
  }

  render() {
    let { titles } = this.resources.account.forgotPassword;
    return (
      <PublicLayout>
        <PageTitle>{titles.pageHeader}</PageTitle>
        <MarginedLayout>
          <CenteredFormLayout>
            <ForgotPasswordForm resources={this.resources} />
          </CenteredFormLayout>
        </MarginedLayout>
      </PublicLayout>
    );
  }
}
