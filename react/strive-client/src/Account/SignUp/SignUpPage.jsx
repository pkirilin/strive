import React from "react";
import {
  CenteredFormLayout,
  PageTitle,
  MarginedLayout
} from "../../_components";
import { getResourcesForCurrentCulture, config } from "../../_helpers";
import { SignUpForm } from "./SignUpForm";

export class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: getResourcesForCurrentCulture()
    };
  }

  componentWillMount() {
    document.title = `${config.brandName} - Sign up`;
  }

  render() {
    return (
      <div>
        <PageTitle>Sign up to Strive</PageTitle>
        <MarginedLayout>
          <CenteredFormLayout>
            <SignUpForm />
          </CenteredFormLayout>
        </MarginedLayout>
      </div>
    );
  }
}
