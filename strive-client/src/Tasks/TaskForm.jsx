import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, FormGroup, Row, Col, Button } from "reactstrap";
import { alertActions } from "../_actions";
import { AppTextBox, AppTextArea } from "../_components";
import { validationStatuses } from "../_constants";
import { actionHelper } from "../_helpers";
import {
  validationUtils,
  validationRulesSetters
} from "../_helpers/validation";

class TaskForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    loadingText: PropTypes.string,
    submitButtonText: PropTypes.string,
    projectId: PropTypes.number
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
    }
  }

  render() {
    return (
      <Form id={this.props.id}>
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

const connectedTaskForm = connect()(TaskForm);
export { connectedTaskForm as TaskForm };
