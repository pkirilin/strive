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
    setStatusForTasks: PropTypes.func.isRequired,
    chooseAllChecked: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.onChooseAllCheck = this.onChooseAllCheck.bind(this);
    this.onStatusDropdownItemClicked = this.onStatusDropdownItemClicked.bind(
      this
    );
  }

  onChooseAllCheck() {
    const { changeCheckedStatusForTasks, chooseAllChecked } = this.props;
    changeCheckedStatusForTasks(!chooseAllChecked);
  }

  onStatusDropdownItemClicked(event) {
    const { setStatusForTasks, taskFilterData, projectId } = this.props;
    const setStatusData = {
      tasks: this.props.tasks,
      status: event.target.innerText
    };
    setStatusForTasks(setStatusData, { ...taskFilterData, projectId });
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
      failedToFetchTaskStatuses,
      chooseAllChecked
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
              checked={chooseAllChecked}
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
