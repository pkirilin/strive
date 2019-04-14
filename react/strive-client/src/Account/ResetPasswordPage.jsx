import React from "react";
import { CenteredFormLayout, MainTitle, MarginedLayout } from "../_components";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { getResourcesForCurrentCulture, config } from "../_helpers";

export class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: getResourcesForCurrentCulture()
    };
  }

  componentWillMount() {
    document.title = `${config.brandName} - ${
      this.state.resources.title.resetPassword
    }`;
  }

  render() {
    return (
      <div>
        <MainTitle text="Password change" />
        <MarginedLayout>
          <CenteredFormLayout>
            <ResetPasswordForm />
          </CenteredFormLayout>
        </MarginedLayout>
      </div>
    );
  }
}
