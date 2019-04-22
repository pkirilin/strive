import React from "react";
import { Switch, Redirect, Route } from "react-router";
import { NotFoundPage } from "../ErrorPages";
import { ProjectsPage } from "./Overview";

export class Projects extends React.Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/projects/overview" />
        <Redirect exact from="/projects" to="/projects/overview" />
        <Route exact path="/projects/overview" component={ProjectsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}
