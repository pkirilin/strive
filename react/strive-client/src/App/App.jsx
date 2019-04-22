import React from "react";
import { Router, Switch, Route } from "react-router";
import { history, config } from "../_helpers";
import { PrivateRoute, ApplicationAlert } from "../_components";
//import { Home } from "../Home";
import { Account } from "../Account";
import { Projects } from "../Projects";
import { NotFoundPage } from "../ErrorPages";

export class App extends React.Component {
  componentWillMount() {
    document.title = config.brandName;
  }

  render() {
    return (
      <div>
        <ApplicationAlert />
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={Projects} />
            {/* <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/home" component={Home} /> */}
            <PrivateRoute path="/projects" component={Projects} />
            <Route path="/account" component={Account} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}
