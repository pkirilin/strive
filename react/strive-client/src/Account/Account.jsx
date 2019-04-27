import React from "react";
import { Switch, Redirect, Route } from "react-router";
import { PublicLayout } from "../_components";
import { LoginPage, RegisterPage, ForgotPasswordPage } from "./";
import { NotFoundPage } from "../ErrorPages";

export class Account extends React.Component {
  render() {
    return (
      <PublicLayout>
        <Switch>
          <Redirect exact from="/account" to="/account/login" />
          <Route exact path="/account/login" component={LoginPage} />
          <Route exact path="/account/register" component={RegisterPage} />
          <Route
            exact
            path="/account/forgot-password"
            component={ForgotPasswordPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </PublicLayout>
    );
  }
}
