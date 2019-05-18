import React from "react";
import { Switch, Route } from "react-router";
import { CreateTaskPage } from "./Create/CreateTaskPage";
import { NotFoundPage } from "../ErrorPages";

export class Tasks extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/tasks/create" component={CreateTaskPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}
