import React from "react";
import {
  CenteredFormLayout,
  PageTitle,
  MarginedLayout,
  PublicLayout
} from "../../_components";
import { LoginForm } from "./LoginForm";
import { config, getResources } from "../../_helpers";

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.resources = getResources();
  }

  componentWillMount() {
    let { documentTitles } = this.resources.account;
    document.title = `${config.brandName} - ${documentTitles.login}`;
  }

  render() {
    let { titles } = this.resources.account.login;
    return (
      <PublicLayout>
        <PageTitle>{titles.pageHeader}</PageTitle>
        <MarginedLayout>
          <CenteredFormLayout>
            <LoginForm resources={this.resources} />
          </CenteredFormLayout>
        </MarginedLayout>
      </PublicLayout>
    );
  }
}
