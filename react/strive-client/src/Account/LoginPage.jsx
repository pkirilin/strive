import React from "react";
import { BRAND_NAME } from "../_constants";
import { CenteredFormLayout, MainTitle, MarginedLayout } from "../_components";
import { LoginForm } from "./LoginForm";
import { getResourcesForCurrentCulture } from "../_helpers";

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: getResourcesForCurrentCulture()
    };
  }

  componentWillMount() {
    document.title = `${BRAND_NAME} - ${
      this.state.resources.titleResources.login
    }`;
  }

  render() {
    return (
      <div>
        <MainTitle text={`Sign in to ${BRAND_NAME}`} />
        <MarginedLayout>
          <CenteredFormLayout>
            <LoginForm />
          </CenteredFormLayout>
        </MarginedLayout>
      </div>
    );
  }
}
