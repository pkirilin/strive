import React from "react";
import { BRAND_NAME } from "../_constants";
import { CenteredFormLayout, MainTitle, MarginedLayout } from "../_components";
import { RegisterForm } from "./RegisterForm";

export class RegisterPage extends React.Component {
  render() {
    return (
      <div>
        <MainTitle text={`Sign up to ${BRAND_NAME}`} />
        <MarginedLayout>
          <CenteredFormLayout>
            <RegisterForm />
          </CenteredFormLayout>
        </MarginedLayout>
      </div>
    );
  }
}
