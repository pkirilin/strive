import React from "react";
import {
  CenteredFormLayout,
  MainTitle,
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
    document.title = `${config.brandName} - ${
      this.state.resources.title.signUp
    }`;
  }

  render() {
    return (
      <div>
        <MainTitle text={`Sign up to ${config.brandName}`} />
        <MarginedLayout>
          <CenteredFormLayout>
            <SignUpForm />
          </CenteredFormLayout>
        </MarginedLayout>
      </div>
    );
  }
}
