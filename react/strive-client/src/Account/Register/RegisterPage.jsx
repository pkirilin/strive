import React from "react";
import {
  CenteredFormLayout,
  PageTitle,
  MarginedLayout
} from "../../_components";
import { RegisterForm } from "./RegisterForm";
import { getResourcesForCurrentCulture, config } from "../../_helpers";

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
        <PageTitle>{`${config.brandName} - Register`}</PageTitle>
        <MarginedLayout>
          <CenteredFormLayout>
            <RegisterForm />
          </CenteredFormLayout>
        </MarginedLayout>
      </div>
    );
  }
}
