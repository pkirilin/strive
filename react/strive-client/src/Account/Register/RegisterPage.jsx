import React from "react";
import {
  CenteredFormLayout,
  PageTitle,
  MarginedLayout,
  PublicLayout
} from "../../_components";
import { RegisterForm } from "./RegisterForm";
import { config, getResources } from "../../_helpers";

export class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.resources = getResources();
  }

  componentWillMount() {
    let { documentTitles } = this.resources.account;
    document.title = `${config.brandName} - ${documentTitles.register}`;
  }

  render() {
    let { titles } = this.resources.account.register;
    return (
      <PublicLayout>
        <PageTitle>{titles.pageHeader}</PageTitle>
        <MarginedLayout>
          <CenteredFormLayout>
            <RegisterForm resources={this.resources} />
          </CenteredFormLayout>
        </MarginedLayout>
      </PublicLayout>
    );
  }
}
