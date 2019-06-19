import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import { tasksActions, taskStatusesActions } from "../../_actions";
import { AppCheckBox } from "../../_components";

const mapStateToProps = state => {
  const { tasks } = state.tasksReducer.taskListReducer;
  const { setStatusSuccess } = state.tasksReducer.taskOperationsReducer;
  return {
    tasks,
    setStatusSuccess
  };
};

class TaskChoosePanel extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    projectId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      chooseAllChecked: false
    };

    this.onChooseAllCheck = this.onChooseAllCheck.bind(this);
    this.onStatusDropdownItemClicked = this.onStatusDropdownItemClicked.bind(
      this
    );
  }

  componentWillReceiveProps(nextProps) {
    const { tasks, setStatusSuccess, projectId } = this.props;

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

    // "Set status" clicked, status successfully changed
    if (!setStatusSuccess && nextProps.setStatusSuccess === true) {
      // Clearing all checkboxes
      this.setState(
        {
          chooseAllChecked: false
        },
        () => {
          this.props.dispatch(
            tasksActions.checkAll(this.state.chooseAllChecked)
          );
        }
      );
      // Refreshing task list to show actual statuses
      this.props.dispatch(tasksActions.getList(projectId));
      // Refreshing task status tabs info
      this.props.dispatch(taskStatusesActions.getStatusTabs(projectId));
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

  onStatusDropdownItemClicked(event) {
    const setStatusData = {
      tasks: this.props.tasks,
      status: event.target.innerText
    };
    this.props.dispatch(tasksActions.setStatus(setStatusData));
  }

  render() {
    let { tasks } = this.props;
    if (!tasks || (tasks && tasks.length === 0)) {
      // If task collection is empty or not exists, there's no point to show this panel
      return <div />;
    }
    return (
      <div className="mt-4 d-flex justify-content-between align-items-baseline">
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
          <DropdownMenu right onClick={this.onStatusDropdownItemClicked}>
            <DropdownItem>Planned</DropdownItem>
            <DropdownItem>In process</DropdownItem>
            <DropdownItem>Completed</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }
}

const connectedTaskChoosePanel = connect(mapStateToProps)(TaskChoosePanel);
export { connectedTaskChoosePanel as TaskChoosePanel };
