import React from "react";
import {
  PageTitle,
  PublicLayout,
  DocumentTitleSetter
} from "../../_components";
import { RegisterForm } from "./RegisterForm";

export class RegisterPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter values={["Register"]}>
        <PublicLayout>
          <PageTitle>Sign up to Strive</PageTitle>
          <RegisterForm />
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
