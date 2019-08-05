import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router";
import LoginPage from "./login";
import RegisterPage from "./register";
import NotFoundPage from "../not-found";

export default class Account extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/account" to="/account/login" />
        <Route exact path="/account/login" component={LoginPage} />
        <Route exact path="/account/register" component={RegisterPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}
