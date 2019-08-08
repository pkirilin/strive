import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router";
import NotFoundPage from "../not-found";
import ProjectsOverviewPage from "./overview";
import CreateProjectPage from "./create";
import EditProjectPage from "./edit";
import ProjectInfoPage from "./info";

export default class Projects extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/projects/overview" />
        <Redirect exact from="/projects" to="/projects/overview" />
        <Route
          exact
          path="/projects/overview"
          component={ProjectsOverviewPage}
        />
        <Route
          exact
          path="/projects/info/:projectId"
          component={ProjectInfoPage}
        />
        <Route exact path="/projects/create" component={CreateProjectPage} />
        <Route
          exact
          path="/projects/edit/:projectId"
          component={EditProjectPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}
