import React from "react";
import { Router, Switch, Route } from "react-router";
import { history } from "../_helpers";
import { Home } from "../Home";
import { Account } from "../Account";
//import { PrivateRoute } from "../_components";

export class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            {/* <PrivateRoute exact path="/" component={Home} /> */}
            <Route exact path="/" component={Home} />
            <Route path="/account" component={Account} />
          </Switch>
        </Router>
      </div>
    );
  }
}
