import React from "react";
import { Switch, Redirect, Route } from "react-router";
import { NotFoundPage } from "../ErrorPages";
import { ProjectsPage } from "./Overview/ProjectsPage";
import { CreateProjectPage } from "./Create/CreateProjectPage";

export class Projects extends React.Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/projects/overview" />
        <Redirect exact from="/projects" to="/projects/overview" />
        <Route exact path="/projects/overview" component={ProjectsPage} />
        <Route exact path="/projects/create" component={CreateProjectPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}
