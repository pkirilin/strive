import React from "react";
import { Router, Switch, Route } from "react-router";
import { history } from "../_helpers";
import { Home } from "../Home";
import { Account } from "../Account";

export class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/account" component={Account} />
          </Switch>
        </Router>
      </div>
    );
  }
}
