import React from "react";
import {
  CenteredFormLayout,
  DocumentTitleSetter,
  PageTitle,
  MarginedLayout,
  PublicLayout
} from "../../_components";
import { getResources } from "../../_helpers";
import { LoginForm } from "./LoginForm";

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.resources = getResources();
  }

  render() {
    let { documentTitles } = this.resources.account;
    let { titles } = this.resources.account.login;
    return (
      <DocumentTitleSetter values={[documentTitles.login]}>
        <PublicLayout>
          <PageTitle>{titles.pageHeader}</PageTitle>
          <MarginedLayout>
            <CenteredFormLayout>
              <LoginForm resources={this.resources} />
            </CenteredFormLayout>
          </MarginedLayout>
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
