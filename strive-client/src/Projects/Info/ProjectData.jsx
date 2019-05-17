import React from "react";
import PropTypes from "prop-types";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { AppHeader } from "../../_components";

export const ProjectData = props => {
  let { name, description } = props.data;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <AppHeader level="4" centered={false}>
          {name}
        </AppHeader>
        <UncontrolledDropdown>
          <DropdownToggle color="light border" caret>
            Actions
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Edit project</DropdownItem>
            <DropdownItem>Delete project</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <div>{description}</div>
    </div>
  );
};

ProjectData.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired
};
