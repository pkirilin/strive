import React from "react";
import { Switch, Redirect, Route } from "react-router";
import { PublicLayout } from "../_components";
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage
} from "./";
import { NotFoundPage } from "../ErrorPages";

export class Account extends React.Component {
  render() {
    return (
      <PublicLayout>
        <Switch>
          <Route path="/account/login" component={LoginPage} />
          <Route path="/account/register" component={RegisterPage} />
          <Route
            path="/account/forgot-password"
            component={ForgotPasswordPage}
          />
          <Route path="/account/reset-password" component={ResetPasswordPage} />
          <Redirect exact from="/account" to="/account/login" />
          <Route component={NotFoundPage} />
        </Switch>
      </PublicLayout>
    );
  }
}
