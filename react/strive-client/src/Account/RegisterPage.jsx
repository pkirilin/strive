import React from "react";
import { BRAND_NAME } from "../_constants";
import { CenteredFormLayout, MainTitle, MarginedLayout } from "../_components";
import { RegisterForm } from "./RegisterForm";
import { titleResources } from "../_resources";

export class RegisterPage extends React.Component {
  componentWillMount() {
    document.title = `${BRAND_NAME} - ${titleResources.register}`;
  }

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
