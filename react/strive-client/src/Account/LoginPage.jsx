import React from "react";
import { CenteredFormLayout, MainTitle, MarginedLayout } from "../_components";
import { LoginForm } from "./LoginForm";
import { getResourcesForCurrentCulture, config } from "../_helpers";

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: getResourcesForCurrentCulture()
    };
  }

  componentWillMount() {
    document.title = `${config.brandName} - ${
      this.state.resources.title.login
    }`;
  }

  render() {
    return (
      <div>
        <MainTitle text={`Sign in to ${config.brandName}`} />
        <MarginedLayout>
          <CenteredFormLayout>
            <LoginForm />
          </CenteredFormLayout>
        </MarginedLayout>
      </div>
    );
  }
}
