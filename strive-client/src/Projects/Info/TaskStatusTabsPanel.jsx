import React from "react";
import { Nav, NavItem, NavLink, Button, Badge } from "reactstrap";

export class TaskStatusTabsPanel extends React.Component {
  render() {
    return (
      <div className="mt-4 d-flex justify-content-between">
        <div>
          <Nav tabs>
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
        </div>
        <Button color="light border">New task</Button>
      </div>
    );
  }
}
