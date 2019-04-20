import React from "react";
import { Route, Redirect } from "react-router-dom";
import { config } from "../_helpers";
import Cookies from "js-cookie";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Cookies.get(config.cookies.user.keyName) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/account/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
