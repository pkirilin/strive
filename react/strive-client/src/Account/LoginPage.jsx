import React from "react";
import { BRAND_NAME } from "../_constants";
import { CenteredFormLayout, MainTitle, MarginedLayout } from "../_components";
import { LoginForm } from "./LoginForm";
import { titleResources } from "../_resources";

export class LoginPage extends React.Component {
  componentWillMount() {
    document.title = `${BRAND_NAME} - ${titleResources.login}`;
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
