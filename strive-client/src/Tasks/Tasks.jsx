import React, { Component } from "react";
import { Switch, Route } from "react-router";
import CreateTaskPageContainer from "./Create";
import EditTaskPageContainer from "./Edit";
import { TaskInfoPage } from "./Info/TaskInfoPage";
import { NotFoundPage } from "../ErrorPages";

export default class Tasks extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/tasks/create/:projectId"
          component={CreateTaskPageContainer}
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
