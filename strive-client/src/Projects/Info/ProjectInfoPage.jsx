import React from "react";
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import {
  DocumentTitleSetter,
  PrivateLayout,
  AppHeader
} from "../../_components";

export const ProjectInfoPage = props => {
  return (
    <DocumentTitleSetter values={["Project", "Name"]}>
      <PrivateLayout>
        <AppHeader>Project info</AppHeader>
        <div>
          <Row className="d-flex justify-content-between align-items-center">
            <AppHeader level="4">Name</AppHeader>
            <UncontrolledDropdown>
              <DropdownToggle color="light border" caret>
                Actions
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Edit project</DropdownItem>
                <DropdownItem>Delete project</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Row>
          <Row>
            <div className="text-secondary">Description</div>
          </Row>
        </div>
      </PrivateLayout>
    </DocumentTitleSetter>
  );
};
