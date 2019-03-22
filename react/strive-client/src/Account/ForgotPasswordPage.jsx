import React from "react";
import { CenteredFormLayout, MainTitle, MarginedLayout } from "../_components";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { BRAND_NAME } from "../_constants";
import { getResourcesForCurrentCulture } from "../_helpers";

export class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: getResourcesForCurrentCulture()
    };
  }

  componentWillMount() {
    document.title = `${BRAND_NAME} - ${
      this.state.resources.title.forgotPassword
    }`;
  }

  render() {
    return (
      <div>
        <MainTitle text="Reset your password" />
        <MarginedLayout>
          <CenteredFormLayout>
            <ForgotPasswordForm />
          </CenteredFormLayout>
        </MarginedLayout>
      </div>
    );
  }
}
