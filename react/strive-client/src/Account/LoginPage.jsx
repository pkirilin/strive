import React from "react";
import { BRAND_NAME } from "../_constants";
import { CenteredFormLayout, MainTitle, MarginedLayout } from "../_components";
import { LoginForm } from "./LoginForm";

export class LoginPage extends React.Component {
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
