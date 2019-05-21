import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import { tasksActions } from "../../_actions";
import { AppCheckBox } from "../../_components";

class TaskChoosePanel extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      chooseAllChecked: false
    };

    this.onChooseAllCheck = this.onChooseAllCheck.bind(this);
  }

  onChooseAllCheck() {
    this.setState(
      {
        chooseAllChecked: !this.state.chooseAllChecked
      },
      () => {
        this.props.dispatch(tasksActions.checkAll());
      }
    );
  }

  render() {
    return (
      <div className="mt-4 mb-4">
        <div className="d-flex justify-content-between align-items-baseline">
          <AppCheckBox
            id="chkChooseAllTasks"
            label="Choose all"
            checked={this.state.chooseAllChecked}
            onChange={this.onChooseAllCheck}
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

const connectedTaskChoosePanel = connect()(TaskChoosePanel);
export { connectedTaskChoosePanel as TaskChoosePanel };
