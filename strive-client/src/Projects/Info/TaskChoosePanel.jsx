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

const mapStateToProps = state => {
  let { tasks } = state.tasksReducer.taskListReducer;
  return {
    tasks
  };
};

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

  componentWillReceiveProps(nextProps) {
    let { tasks } = this.props;
    // If there's a task collection received
    if (tasks !== nextProps.tasks && tasks.length > 0) {
      if (tasks.every(task => task.checked === true)) {
        // Checking "Select all" checkbox, if every task in list was checked
        this.setState({
          chooseAllChecked: true
        });
      } else {
        // Unchecking "Select all" checkbox, if any task in list was unchecked
        if (tasks.some(task => task.checked === false)) {
          this.setState({
            chooseAllChecked: false
          });
        }
      }
    }
  }

  onChooseAllCheck() {
    this.setState(
      {
        chooseAllChecked: !this.state.chooseAllChecked
      },
      () => {
        this.props.dispatch(tasksActions.checkAll(this.state.chooseAllChecked));
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

const connectedTaskChoosePanel = connect(mapStateToProps)(TaskChoosePanel);
export { connectedTaskChoosePanel as TaskChoosePanel };
