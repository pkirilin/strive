import React from "react";
import { Switch, Redirect, Route } from "react-router";
import { PublicLayout } from "../_components";
import { LoginPage, RegisterPage } from "./";

export class Account extends React.Component {
  render() {
    return (
      <PublicLayout>
        <Switch>
          <Route path="/account/login" component={LoginPage} />
          <Route path="/account/register" component={RegisterPage} />
          <Redirect from="/account" to="/account/login" />
        </Switch>
      </PublicLayout>
    );
  }
}
