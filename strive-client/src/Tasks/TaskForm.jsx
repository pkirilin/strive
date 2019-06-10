import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, FormGroup, Row, Col, Button } from "reactstrap";
import { tasksActions } from "../_actions";
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

  const { project } = state.projectsReducer.projectInfoReducer;

  return {
    sendingTaskInfo,
    badRequestResponseJson,
    internalServerError,
    gettingTaskForUpdate: gettingTask,

    task,
    project,

    notFoundTaskForUpdate: notFound,
    failedToFetchTaskForUpdate: failedToFetch
  };
};

class TaskForm extends React.Component {
  static propTypes = {
    purpose: PropTypes.oneOf(["create", "update"]),
    id: PropTypes.string,
    loadingText: PropTypes.string,
    submitButtonText: PropTypes.string,
    projectId: PropTypes.number,

    sendingTaskInfo: PropTypes.bool,
    internalServerError: PropTypes.string,

    badRequestResponseJson: PropTypes.shape({
      taskNameRemote: PropTypes.arrayOf(PropTypes.string)
    }),

    gettingTaskForUpdate: PropTypes.bool,
    task: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
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

    this.trackTaskNameBadRequestResponse = this.trackTaskNameBadRequestResponse.bind(
      this
    );
    this.trackTaskForUpdateFetchedFromServer = this.trackTaskForUpdateFetchedFromServer.bind(
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
      taskName: {
        ...initFieldObj,
        onChange: this.onTaskNameValueChanged
      },
      taskDescription: {
        ...initFieldObj,
        onChange: this.onTaskDescriptionValueChanged
      }
    };
  }

  trackTaskNameBadRequestResponse() {
    if (
      this.props.badRequestResponseJson &&
      this.props.badRequestResponseJson.taskNameRemote
    ) {
      this.setState({
        ...this.state,
        taskName: {
          ...this.state.taskName,
          validationState: {
            status: validationStatuses.invalid,
            message: this.props.badRequestResponseJson.taskNameRemote.join(". ")
          }
        }
      });
    }
  }

  trackTaskForUpdateFetchedFromServer() {
    let { task } = this.props;
    this.setState({
      taskName: {
        value: task.name,
        validationState: validationRulesSetters.resetAll(),
        onChange: this.onTaskNameValueChanged
      },
      taskDescription: {
        value: task.description,
        validationState: validationRulesSetters.resetAll(),
        onChange: this.onTaskDescriptionValueChanged
      }
    });
  }

  componentDidUpdate(prevProps) {
    // Tracks if any bad request (validation error) received from API
    if (
      prevProps.badRequestResponseJson !== this.props.badRequestResponseJson
    ) {
      this.trackTaskNameBadRequestResponse();
      return true;
    }

    // Tracks if current form state values must be replaced by fetched from server ones
    // This happens when user clicked "Edit task" button and server found task with requested id
    if (prevProps.task === undefined && this.props.task !== undefined) {
      this.trackTaskForUpdateFetchedFromServer();
      return true;
    }
  }

  onTaskNameValueChanged(event) {
    this.setState({
      taskName: {
        ...this.state.taskName,
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
        taskName: {
          ...this.state.taskName,
          validationState: validationRulesSetters.validateTaskName(
            this.state.taskName.value
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
        name: this.state.taskName.value,
        description: this.state.taskDescription.value,
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
    let {
      sendingTaskInfo,
      loadingText,
      internalServerError,
      gettingTaskForUpdate,
      failedToFetchTaskForUpdate,
      notFoundTaskForUpdate
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
            {...this.state.taskName}
            label="Name"
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
