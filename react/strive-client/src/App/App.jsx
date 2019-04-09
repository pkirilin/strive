import React from "react";
import { Router, Switch, Route } from "react-router";
import { history } from "../_helpers";
import { PrivateRoute } from "../_components";
import { BRAND_NAME } from "../_constants";
import { Home } from "../Home";
import { Account } from "../Account";
import { NotFoundPage } from "../ErrorPages";
import { connect } from "react-redux";
import { alertActions } from "../_actions";

const mapStateToProps = state => {
  const { alertReducer } = state;
  return {
    alertReducer
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);

    // Clear alert on location change
    history.listen(() => {
      this.props.dispatch(alertActions.clear());
    });
  }

  componentWillMount() {
    document.title = BRAND_NAME;
  }

  render() {
    const { alertReducer } = this.props;

    return (
      <div>
        {alertReducer.message && (
          <div className={`alert ${alertReducer.cssClass}`}>
            {alertReducer.message}
          </div>
        )}
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

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
