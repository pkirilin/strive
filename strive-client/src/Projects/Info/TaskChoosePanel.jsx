import React from "react";
import PropTypes from "prop-types";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import { AppCheckBox } from "../../_components";

export class TaskChoosePanel extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.onChooseAllChecked = this.onChooseAllChecked.bind(this);
  }

  onChooseAllChecked() {}

  render() {
    return (
      <div className="mt-4 mb-4">
        <div className="d-flex justify-content-between align-items-baseline">
          <AppCheckBox
            id="chkChooseAllTasks"
            label="Choose all"
            checked={false}
            onChange={this.onChooseAllChecked}
          />
          <UncontrolledDropdown>
            <DropdownToggle color="light border" caret>
              Set status
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Planned</DropdownItem>
              <DropdownItem>In process</DropdownItem>
              <DropdownItem>Completed</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    );
  }
}
