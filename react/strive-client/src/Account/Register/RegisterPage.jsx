import React from "react";
import {
  CenteredFormLayout,
  PageTitle,
  MarginedLayout
} from "../../_components";
import { RegisterForm } from "./RegisterForm";
import {
  getResourcesForCurrentCulture,
  config,
  getResources
} from "../../_helpers";

export class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.resources = getResources();

    this.state = {
      resources: getResourcesForCurrentCulture()
    };
  }

  componentWillMount() {
    let { documentTitles } = this.resources.account;
    document.title = `${config.brandName} - ${documentTitles.register}`;
  }

  render() {
    let { titles } = this.resources.account.register;
    return (
      <div>
        <PageTitle>{titles.pageHeader}</PageTitle>
        <MarginedLayout>
          <CenteredFormLayout>
            <RegisterForm resources={this.resources} />
          </CenteredFormLayout>
        </MarginedLayout>
      </div>
    );
  }
}
