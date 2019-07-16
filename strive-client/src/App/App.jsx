import React from "react";
import { Router, Switch, Route } from "react-router";
import { history, config } from "../_helpers";
import { PrivateRoute } from "../_components";
import Account from "../Account";
import Projects from "../Projects";
import { Tasks } from "../Tasks";
import { NotFoundPage } from "../ErrorPages";

export class App extends React.Component {
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
