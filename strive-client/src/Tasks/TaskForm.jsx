import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, FormGroup, Row, Col, Button } from "reactstrap";
import { alertActions } from "../_actions";
import { AppTextBox, AppTextArea, AppSpinner } from "../_components";
import { validationStatuses } from "../_constants";
import { actionHelper } from "../_helpers";
import {
  validationUtils,
  validationRulesSetters
} from "../_helpers/validation";

const mapStateToProps = state => {
  let {
    sendingTaskInfo,
    badRequestResponseJson,
    internalServerError
  } = state.tasksReducer.taskOperationsReducer;
  return {
    sendingTaskInfo,
    badRequestResponseJson,
    internalServerError
  };
};

class TaskForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    loadingText: PropTypes.string,
    submitButtonText: PropTypes.string,
    projectId: PropTypes.number,
    tasksAction: PropTypes.func.isRequired,

    sendingTaskInfo: PropTypes.bool,
    internalServerError: PropTypes.string,

    badRequestResponseJson: PropTypes.shape({
      taskNameRemote: PropTypes.arrayOf(PropTypes.string)
    })
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

  componentWillMount() {
    // If project id is not set, it's unable to create task, because it should be bound to specific project
    if (!this.props.projectId) {
      actionHelper.redirectToProjects();
      this.props.dispatch(
        alertActions.error(
          "Unable to determine project id. Redirected to your project list"
        )
      );
    }
  }

  componentDidUpdate(prevProps) {
    // Tracks if any bad request (validation error) received from API
    if (
      prevProps.badRequestResponseJson !== this.props.badRequestResponseJson
    ) {
      this.trackTaskNameBadRequestResponse();
      return true;
    }
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
    const { projectId } = this.props;
    if (projectId) {
      actionHelper.redirectToProjectInfo(projectId);
    }
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
      let { tasksAction, taskId, projectId } = this.props;
      let taskDto = {
        name: this.state.taskName.value,
        description: this.state.taskDescription.value,
        projectId
      };

      if (tasksAction) {
        if (taskId) {
          // Update task action
        } else {
          // Create task action
          this.props.dispatch(tasksAction(taskDto));
        }
      }
    }
  }

  render() {
    let { sendingTaskInfo, loadingText, internalServerError } = this.props;

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
