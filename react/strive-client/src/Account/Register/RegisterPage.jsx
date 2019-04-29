import React from "react";
import {
  CenteredFormLayout,
  PageTitle,
  MarginedLayout,
  PublicLayout,
  DocumentTitleSetter
} from "../../_components";
import { RegisterForm } from "./RegisterForm";
import { getResources } from "../../_helpers";

export class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.resources = getResources();
  }

  render() {
    let { documentTitles } = this.resources.account;
    let { titles } = this.resources.account.register;
    return (
      <DocumentTitleSetter values={[documentTitles.register]}>
        <PublicLayout>
          <PageTitle>{titles.pageHeader}</PageTitle>
          <MarginedLayout>
            <CenteredFormLayout>
              <RegisterForm resources={this.resources} />
            </CenteredFormLayout>
          </MarginedLayout>
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
