import React from "react";
import { Switch, Route } from "react-router";
import { CreateTaskPage } from "./Create/CreateTaskPage";
import { TaskInfoPage } from "./Info/TaskInfoPage";
import { EditTaskPage } from "./Edit/EditTaskPage";
import { NotFoundPage } from "../ErrorPages";

export class Tasks extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/tasks/create/:projectId"
          component={CreateTaskPage}
        />
        <Route exact path="/tasks/info/:taskId" component={TaskInfoPage} />
        <Route exact path="/tasks/edit/:taskId" component={EditTaskPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}
