import React from "react";
import PropTypes from "prop-types";
import { Nav, NavItem, NavLink, Badge } from "reactstrap";
import { actionHelper } from "../../_helpers";

export class TaskStatusTabsPanel extends React.Component {
  static propTypes = {
    projectId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.createTask = this.createTask.bind(this);
  }

  createTask() {
    // Each task should belong to its project, so id of a project needs to be "remembered"
    // both for adding a new task and redirecting user back to project info page
    // Id is remembered in browser history state inside this helper method
    actionHelper.redirectToCreateTask(this.props.projectId);
  }

  render() {
    return (
      <Nav className="mt-4" tabs>
        <NavItem>
          <NavLink className="text-body" href="#" active={true}>
            Planned <Badge color="danger">0</Badge>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="text-body" href="#" active={false}>
            In process <Badge color="primary">0</Badge>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="text-body" href="#" active={false}>
            Completed <Badge color="success">0</Badge>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="text-body" href="#" active={false}>
            All <Badge color="secondary">0</Badge>
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
}
