import React from "react";
import { CenteredFormLayout, MainTitle, MarginedLayout } from "../_components";
import { RegisterForm } from "./RegisterForm";
import { getResourcesForCurrentCulture, config } from "../_helpers";

export class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: getResourcesForCurrentCulture()
    };
  }

  componentWillMount() {
    document.title = `${config.brandName} - ${
      this.state.resources.title.register
    }`;
  }

  render() {
    return (
      <div>
        <MainTitle text={`${config.brandName} - Register`} />
        <MarginedLayout>
          <CenteredFormLayout>
            <RegisterForm />
          </CenteredFormLayout>
        </MarginedLayout>
      </div>
    );
  }
}
