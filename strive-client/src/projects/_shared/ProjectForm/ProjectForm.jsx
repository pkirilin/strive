import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, FormGroup, Button, Row, Col } from "reactstrap";
import { AppTextBox, AppTextArea, AppSpinner } from "../../../_components";
import { validationStatuses } from "../../../_constants";
import { historyHelper } from "../../../_helpers";
import {
  validationRulesSetters,
  validationUtils
} from "../../../_helpers/validation";

export default class ProjectForm extends Component {
  static propTypes = {
    purpose: PropTypes.oneOf(["create", "update"]).isRequired,
    id: PropTypes.string,
    loadingText: PropTypes.string,
    submitButtonText: PropTypes.string,
    sendingProjectInfo: PropTypes.bool,
    badRequestResponse: PropTypes.shape({
      projectNameRemote: PropTypes.arrayOf(PropTypes.string)
    }),
    internalServerError: PropTypes.string,
    gettingProjectForUpdate: PropTypes.bool,
    project: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }),
    notFoundProjectForUpdate: PropTypes.bool,
    failedToFetchProjectForUpdate: PropTypes.bool,
    createProject: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    getProjectInfo: PropTypes.func.isRequired
  };

  static defaultProps = {
    id: "projectForm",
    loadingText: "Sending project info",
    submitButtonText: "Send"
  };

  constructor(props) {
    super(props);

    this.onProjectNameValueChanged = this.onProjectNameValueChanged.bind(this);
    this.onProjectDescriptionValueChanged = this.onProjectDescriptionValueChanged.bind(
      this
    );
    this.onSubmit = this.onSubmit.bind(this);

    this.onSubmitValidationCompleted = this.onSubmitValidationCompleted.bind(
      this
    );

    this.handleProjectNameBadRequestResponse = this.handleProjectNameBadRequestResponse.bind(
      this
    );
    this.handleProjectForUpdateFetchedFromServer = this.handleProjectForUpdateFetchedFromServer.bind(
      this
    );

    const initFieldObj = {
      value: "",
      validationState: {
        status: validationStatuses.default,
        message: ""
      }
    };

    this.state = {
      projectName: {
        ...initFieldObj,
        onChange: this.onProjectNameValueChanged
      },
      projectDescription: {
        ...initFieldObj,
        onChange: this.onProjectDescriptionValueChanged
      }
    };
  }

  handleProjectNameBadRequestResponse() {
    const { badRequestResponse: errors } = this.props;
    if (errors && errors.projectNameRemote) {
      this.setState({
        ...this.state,
        projectName: {
          ...this.state.projectName,
          validationState: {
            status: validationStatuses.invalid,
            message: errors.projectNameRemote.join(". ")
          }
        }
      });
    }
  }

  handleProjectForUpdateFetchedFromServer() {
    const { project } = this.props;
    this.setState({
      projectName: {
        value: project.name,
        validationState: validationRulesSetters.resetAll(),
        onChange: this.onProjectNameValueChanged
      },
      projectDescription: {
        value: project.description,
        validationState: validationRulesSetters.resetAll(),
        onChange: this.onProjectDescriptionValueChanged
      }
    });
  }

  componentDidMount() {
    const { purpose, getProjectInfo, projectId } = this.props;
    if (purpose === "update") {
      getProjectInfo(projectId);
    }
  }

  componentDidUpdate(prevProps) {
    // Tracks if any bad request (validation error) received from API
    if (prevProps.badRequestResponse !== this.props.badRequestResponse) {
      this.handleProjectNameBadRequestResponse();
      return true;
    }

    // Tracks if current form state values must be replaced by fetched from server ones
    // This happens when user clicked "Edit project" button and server found project with requested id
    if (prevProps.project === undefined && this.props.project !== undefined) {
      this.handleProjectForUpdateFetchedFromServer();
      return true;
    }
  }

  onProjectNameValueChanged(event) {
    this.setState({
      projectName: {
        ...this.state.projectName,
        value: event.target.value,
        validationState: validationRulesSetters.validateProjectName(
          event.target.value
        )
      }
    });
  }

  onProjectDescriptionValueChanged(event) {
    this.setState({
      projectDescription: {
        ...this.state.projectDescription,
        value: event.target.value,
        validationState: validationRulesSetters.validateProjectDescription(
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
        projectName: {
          ...this.state.projectName,
          validationState: validationRulesSetters.validateProjectName(
            this.state.projectName.value
          )
        },
        projectDescription: {
          ...this.state.projectDescription,
          validationState: validationRulesSetters.validateProjectDescription(
            this.state.projectDescription.value
          )
        }
      },
      this.onSubmitValidationCompleted
    );
  }

  onSubmitValidationCompleted() {
    if (validationUtils.focusFirstInvalidField(`#${this.props.id}`) === false) {
      const { purpose, project, createProject, updateProject } = this.props;
      let projectData = {
        name: this.state.projectName.value,
        description: this.state.projectDescription.value
      };
      switch (purpose) {
        case "create":
          createProject(projectData);
          break;
        case "update":
          projectData.id = project.id;
          updateProject(projectData);
          break;
        default:
          break;
      }
    }
  }

  render() {
    const {
      sendingProjectInfo,
      gettingProjectForUpdate,
      notFoundProjectForUpdate,
      failedToFetchProjectForUpdate,
      internalServerError
    } = this.props;

    // Showing loading project info spinner while data is fetching (for update)
    if (gettingProjectForUpdate) {
      return <AppSpinner text="Getting project for update" />;
    }

    // If server is not available, showing error message
    if (failedToFetchProjectForUpdate) {
      return (
        <div className="mt-4 text-center text-danger">
          Failed to fetch project data: server is not available
        </div>
      );
    }

    // If server returned not found for current request, showing error message
    if (notFoundProjectForUpdate) {
      return (
        <div className="mt-4 text-center text-danger">
          Project was not found
        </div>
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
      <Form id={this.props.id} className="col-12">
        {sendingProjectInfo && <AppSpinner text={this.props.loadingText} />}
        <FormGroup>
          <AppTextBox
            {...this.state.projectName}
            type="text"
            label="Project name"
            placeholder="Enter project name"
          />
        </FormGroup>

        <FormGroup>
          <AppTextArea
            {...this.state.projectDescription}
            label="Project description"
            placeholder="Enter project description"
          />
        </FormGroup>

        <FormGroup>
          {/* Alignment right */}
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
