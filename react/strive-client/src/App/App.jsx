import React from "react";
import { Router, Switch, Route } from "react-router";
import { history } from "../_helpers";
import { Home } from "../Home";
import { Account } from "../Account";
import { PrivateRoute } from "../_components";
import { NotFoundPage } from "../ErrorPages";

export class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            {/* for debug only */}
            {/* <Route exact path="/" component={Home} /> */}
            {/* <Route path="/home" component={Home} /> */}

            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/home" component={Home} />
            <Route path="/account" component={Account} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}
