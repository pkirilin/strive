import React from "react";
import { Switch, Redirect, Route } from "react-router";
import {
  LoginPage,
  RegisterPage
  //, ForgotPasswordPage
} from "./";
import { NotFoundPage } from "../ErrorPages";

export default class Account extends React.Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/account" to="/account/login" />
        <Route exact path="/account/login" component={LoginPage} />
        <Route exact path="/account/register" component={RegisterPage} />
        {/* <Route
          exact
          path="/account/forgot-password"
          component={ForgotPasswordPage}
        /> */}
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}
