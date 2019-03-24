import React from "react";
import { BRAND_NAME } from "../_constants";
import { CenteredFormLayout, MainTitle, MarginedLayout } from "../_components";
import { getResourcesForCurrentCulture } from "../_helpers";
import { SignUpForm } from "./SignUpForm";

export class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: getResourcesForCurrentCulture()
    };
  }

  componentWillMount() {
    document.title = `${BRAND_NAME} - ${this.state.resources.title.signUp}`;
  }

  render() {
    return (
      <div>
        <MainTitle text={`Sign up to ${BRAND_NAME}`} />
        <MarginedLayout>
          <CenteredFormLayout>
            <SignUpForm />
          </CenteredFormLayout>
        </MarginedLayout>
      </div>
    );
  }
}
