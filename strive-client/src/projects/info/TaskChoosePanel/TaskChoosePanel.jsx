import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Col
} from "reactstrap";
import { FormCheckBox, Spinner, SectionSeparator } from "../../../_components";

export default class TaskChoosePanel extends Component {
  static propTypes = {
    className: PropTypes.string,
    projectId: PropTypes.number.isRequired,
    changeCheckedStatusForTasks: PropTypes.func.isRequired,
    getTasks: PropTypes.func.isRequired,
    getStatusTabs: PropTypes.func.isRequired,
    setStatusForTasks: PropTypes.func.isRequired
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
    const {
      tasks,
      setStatusSuccess,
      projectId,
      changeCheckedStatusForTasks,
      getTasks,
      getStatusTabs
    } = this.props;

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
          changeCheckedStatusForTasks(this.state.chooseAllChecked);
        }
      );
      // Refreshing task list to show actual statuses
      getTasks({
        ...this.props.taskFilterData,
        projectId
      });
      // Refreshing task status tabs info
      getStatusTabs(projectId);
    }
  }

  onChooseAllCheck() {
    const { changeCheckedStatusForTasks } = this.props;
    this.setState(
      {
        chooseAllChecked: !this.state.chooseAllChecked
      },
      () => {
        changeCheckedStatusForTasks(this.state.chooseAllChecked);
      }
    );
  }

  onStatusDropdownItemClicked(event) {
    const { setStatusForTasks } = this.props;
    const setStatusData = {
      tasks: this.props.tasks,
      status: event.target.innerText
    };
    setStatusForTasks(setStatusData);
  }

  render() {
    const { tasks } = this.props;

    if (!tasks || (tasks && tasks.length === 0)) {
      // If task collection is empty or not exists, there's no point to show this panel
      return <div />;
    }

    const {
      loadingStatusList,
      taskStatuses,
      failedToFetchTaskStatuses
    } = this.props;

    let statusesDropdownMenuContent = <div />;

    if (loadingStatusList) {
      statusesDropdownMenuContent = <Spinner text="Loading task statuses" />;
    }

    if (failedToFetchTaskStatuses) {
      statusesDropdownMenuContent = (
        <div className="mt-4 mb-4 text-danger text-center">
          Failed to load statuses
        </div>
      );
    }

    if (taskStatuses) {
      statusesDropdownMenuContent = taskStatuses.map(status => (
        <DropdownItem key={status.id}>{status.label}</DropdownItem>
      ));
    }

    return (
      <SectionSeparator>
        <Row className="d-flex justify-content-between align-items-baseline">
          <Col xs="auto">
            <FormCheckBox
              id="chkChooseAllTasks"
              label="Choose all"
              checked={this.state.chooseAllChecked}
              onChange={this.onChooseAllCheck}
            />
          </Col>
          <Col xs="auto">
            <UncontrolledDropdown>
              <DropdownToggle color="light border" caret>
                Set status
              </DropdownToggle>
              <DropdownMenu right onClick={this.onStatusDropdownItemClicked}>
                {statusesDropdownMenuContent}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
        </Row>
      </SectionSeparator>
    );
  }
}
