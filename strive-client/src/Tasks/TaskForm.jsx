import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Form,
  FormGroup,
  Row,
  Col,
  Button,
  Label,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { tasksActions, taskStatusesActions } from "../_actions";
import { AppTextBox, AppTextArea, AppSpinner } from "../_components";
import { validationStatuses } from "../_constants";
import { historyHelper } from "../_helpers";
import {
  validationUtils,
  validationRulesSetters
} from "../_helpers/validation";

const mapStateToProps = state => {
  const {
    sendingTaskInfo,
    badRequestResponseJson,
    internalServerError
  } = state.tasksReducer.taskOperationsReducer;

  const {
    gettingTask,
    task,
    notFound,
    failedToFetch
  } = state.tasksReducer.taskInfoReducer;

  const { project } = state.projects.info;

  const { taskStatuses } = state.taskStatusesReducer.taskStatusListReducer;

  return {
    sendingTaskInfo,
    badRequestResponseJson,
    internalServerError,
    gettingTaskForUpdate: gettingTask,

    task,
    project,

    notFoundTaskForUpdate: notFound,
    failedToFetchTaskForUpdate: failedToFetch,

    taskStatuses
  };
};

class TaskForm extends React.Component {
  static propTypes = {
    purpose: PropTypes.oneOf(["create", "update"]).isRequired,
    id: PropTypes.string,
    loadingText: PropTypes.string,
    submitButtonText: PropTypes.string,
    projectId: PropTypes.number,

    sendingTaskInfo: PropTypes.bool,
    internalServerError: PropTypes.string,

    gettingTaskForUpdate: PropTypes.bool,
    task: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }),
    notFoundTaskForUpdate: PropTypes.bool,
    failedToFetchTaskForUpdate: PropTypes.bool
  };

  static defaultProps = {
    id: "taskForm",
    loadingText: "Sending task info",
    submitButtonText: "Send"
  };

  constructor(props) {
    super(props);

    this.onTaskNameValueChanged = this.onTaskNameValueChanged.bind(this);
    this.onTaskDescriptionValueChanged = this.onTaskDescriptionValueChanged.bind(
      this
    );

    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitValidationCompleted = this.onSubmitValidationCompleted.bind(
      this
    );

    this.trackTaskForUpdateFetchedFromServer = this.trackTaskForUpdateFetchedFromServer.bind(
      this
    );
    this.trackTaskStatusListFetchedFromServer = this.trackTaskStatusListFetchedFromServer.bind(
      this
    );

    let initFieldObj = {
      value: "",
      validationState: {
        status: validationStatuses.default,
        message: ""
      }
    };

    this.state = {
      taskTitle: {
        ...initFieldObj,
        onChange: this.onTaskNameValueChanged
      },
      taskDescription: {
        ...initFieldObj,
        onChange: this.onTaskDescriptionValueChanged
      },
      taskStatus: ""
    };

    this.props.dispatch(taskStatusesActions.getStatusList());
  }

  trackTaskForUpdateFetchedFromServer() {
    const { task } = this.props;
    this.setState({
      taskTitle: {
        value: task.title,
        validationState: validationRulesSetters.resetAll(),
        onChange: this.onTaskNameValueChanged
      },
      taskDescription: {
        value: task.description,
        validationState: validationRulesSetters.resetAll(),
        onChange: this.onTaskDescriptionValueChanged
      },
      taskStatus: task.status.label
    });
  }

  trackTaskStatusListFetchedFromServer() {
    const { purpose } = this.props;

    switch (purpose) {
      case "create":
        this.setState({
          taskStatus:
            this.props.taskStatuses.length === 0
              ? ""
              : this.props.taskStatuses[0].label
        });
        break;
      default:
        break;
    }
  }

  componentDidUpdate(prevProps) {
    // Tracks if current form state values must be replaced by fetched from server ones
    // This happens when user clicked "Edit task" button and server found task with requested id
    if (prevProps.task === undefined && this.props.task !== undefined) {
      this.trackTaskForUpdateFetchedFromServer();
      return true;
    }

    // Tracks whether task statuses list was fetched from server or not
    if (
      prevProps.taskStatuses === undefined &&
      this.props.taskStatuses !== undefined
    ) {
      this.trackTaskStatusListFetchedFromServer();
      return true;
    }
  }

  onTaskNameValueChanged(event) {
    this.setState({
      taskTitle: {
        ...this.state.taskTitle,
        value: event.target.value,
        validationState: validationRulesSetters.validateTaskName(
          event.target.value
        )
      }
    });
  }

  onTaskDescriptionValueChanged(event) {
    this.setState({
      taskDescription: {
        ...this.state.taskDescription,
        value: event.target.value,
        validationState: validationRulesSetters.validateTaskDescription(
          event.target.value
        )
      }
    });
  }

  onCancel() {
    historyHelper.goBack();
  }

  onSubmit() {
    this.setState(
      {
        taskTitle: {
          ...this.state.taskTitle,
          validationState: validationRulesSetters.validateTaskName(
            this.state.taskTitle.value
          )
        },
        taskDescription: {
          ...this.state.taskDescription,
          validationState: validationRulesSetters.validateTaskDescription(
            this.state.taskDescription.value
          )
        }
      },
      this.onSubmitValidationCompleted
    );
  }

  onSubmitValidationCompleted() {
    if (validationUtils.focusFirstInvalidField(`#${this.props.id}`) === false) {
      const { purpose } = this.props;

      let taskData = {
        title: this.state.taskTitle.value,
        description: this.state.taskDescription.value,
        status: this.state.taskStatus,
        projectId: null
      };

      switch (purpose) {
        case "create":
          taskData.projectId = this.props.projectId;
          this.props.dispatch(tasksActions.create(taskData));
          break;
        case "update":
          taskData.id = this.props.task.id;
          taskData.projectId = this.props.task.project.id;
          this.props.dispatch(tasksActions.update(taskData));
          break;
        default:
          break;
      }
    }
  }

  render() {
    const {
      sendingTaskInfo,
      loadingText,
      internalServerError,
      gettingTaskForUpdate,
      failedToFetchTaskForUpdate,
      notFoundTaskForUpdate,
      taskStatuses
    } = this.props;

    // Showing loading task info spinner while data is fetching (for update)
    if (gettingTaskForUpdate) {
      return <AppSpinner text="Getting task for update" />;
    }

    // If server is not available, showing error message
    if (failedToFetchTaskForUpdate) {
      return (
        <div className="mt-4 text-center text-danger">
          Failed to fetch task data: server is not available
        </div>
      );
    }

    // If server returned not found for current request, showing error message
    if (notFoundTaskForUpdate) {
      return (
        <div className="mt-4 text-center text-danger">Task was not found</div>
      );
    }

    if (internalServerError) {
      return (
        <div className="mt-4 text-center text-danger">
          {internalServerError}
        </div>
      );
    }

    return (
      <Form id={this.props.id}>
        {sendingTaskInfo && <AppSpinner text={loadingText} />}
        <FormGroup>
          <AppTextBox
            {...this.state.taskTitle}
            label="Title"
            placeholder="Enter general task info"
          />
        </FormGroup>

        <FormGroup>
          <AppTextArea
            {...this.state.taskDescription}
            label="Description"
            placeholder="Enter additional task info"
          />
        </FormGroup>

        {!taskStatuses ? (
          <AppSpinner text="Loading statuses list" />
        ) : (
          <FormGroup>
            <Label className="font-weight-bold">Status</Label>
            <UncontrolledDropdown>
              <DropdownToggle
                color="light"
                className="col text-left border"
                caret
              >
                {this.state.taskStatus}
              </DropdownToggle>
              <DropdownMenu
                onClick={event => {
                  this.setState({
                    taskStatus: event.target.innerText
                  });
                }}
              >
                {taskStatuses.map(status => (
                  <DropdownItem key={status.id}>{status.label}</DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </FormGroup>
        )}

        <FormGroup>
          <Row>
            <Col sm={{ size: 6, offset: 6 }} xs={{ size: 12, offset: 0 }}>
              <Row>
                <Col className="pt-2 pb-2">
                  <Button
                    color="light border"
                    className="col"
                    onClick={this.onSubmit}
                  >
                    {this.props.submitButtonText}
                  </Button>
                </Col>
                <Col className="pt-2 pb-2">
                  <Button
                    color="light border"
                    className="col"
                    onClick={this.onCancel}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    );
  }
}

const connectedTaskForm = connect(mapStateToProps)(TaskForm);
export { connectedTaskForm as TaskForm };
