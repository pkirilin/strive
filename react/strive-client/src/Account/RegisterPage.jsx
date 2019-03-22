import React from "react";
import { BRAND_NAME } from "../_constants";
import { CenteredFormLayout, MainTitle, MarginedLayout } from "../_components";
import { RegisterForm } from "./RegisterForm";
import { getResourcesForCurrentCulture } from "../_helpers";

export class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: getResourcesForCurrentCulture()
    };
  }

  componentWillMount() {
    document.title = `${BRAND_NAME} - ${this.state.resources.title.register}`;
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
