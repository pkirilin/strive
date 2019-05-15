import React from "react";
import {
  DocumentTitleSetter,
  PageTitle,
  PublicLayout
} from "../../_components";
import { LoginForm } from "./LoginForm";

export class LoginPage extends React.Component {
  render() {
    return (
      <DocumentTitleSetter values={["Login"]}>
        <PublicLayout>
          <PageTitle>Sign in to Strive</PageTitle>
          <LoginForm />
        </PublicLayout>
      </DocumentTitleSetter>
    );
  }
}
