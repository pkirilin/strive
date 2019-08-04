import React, { Component } from "react";
import { Router, Switch, Route } from "react-router";
import { history, config } from "../_helpers";
import { PrivateRoute } from "../_components";
import Account from "../account";
import Projects from "../projects";
import Tasks from "../tasks";
import { NotFoundPage } from "../ErrorPages";

export class App extends Component {
  componentWillMount() {
    document.title = config.brandName;
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={Projects} />
          <PrivateRoute path="/projects" component={Projects} />
          <PrivateRoute path="/tasks" component={Tasks} />
          <Route path="/account" component={Account} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}
