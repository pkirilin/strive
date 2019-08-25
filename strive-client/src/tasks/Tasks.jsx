import React, { Component } from "react";
import { Switch, Route } from "react-router";
import CreateTaskPage from "./create";
import EditTaskPageContainer from "./edit";
import TaskInfoPage from "./info";
import NotFoundPage from "../not-found";

export default class Tasks extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/tasks/create/:projectId"
          component={CreateTaskPage}
        />
        <Route exact path="/tasks/info/:taskId" component={TaskInfoPage} />
        <Route
          exact
          path="/tasks/edit/:taskId"
          component={EditTaskPageContainer}
        />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}
