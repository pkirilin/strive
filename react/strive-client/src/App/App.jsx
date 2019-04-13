import React from "react";
import { Router, Switch, Route } from "react-router";
import { history } from "../_helpers";
import { PrivateRoute, ApplicationAlert } from "../_components";
import { BRAND_NAME } from "../_constants";
import { Home } from "../Home";
import { Account } from "../Account";
import { NotFoundPage } from "../ErrorPages";

export class App extends React.Component {
  componentWillMount() {
    document.title = BRAND_NAME;
  }

  render() {
    return (
      <div>
        <ApplicationAlert />
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
