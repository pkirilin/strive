import React from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Button, Row, Col } from "reactstrap";
import { TextBox, TextArea, Loading } from "../_components";
import { history } from "../_helpers";
import { validationStatuses } from "../_constants";
import {
  validationRulesSetters,
  validationUtils
} from "../_helpers/validation";

const mapStateToProps = state => {
  let {
    sendingProjectInfo,
    badRequestResponseJson
  } = state.projectsReducer.projectListReducer;
  return {
    sendingProjectInfo,
    badRequestResponseJson
  };
};

class ProjectForm extends React.Component {
  static defaultProps = {
    id: "projectForm",
    loadingText: "Sending a project info",
    submitButtonText: "Send"
  };

  constructor(props) {
    super(props);
    this.resources = this.props.resources;

    this.onProjectNameValueChanged = this.onProjectNameValueChanged.bind(this);
    this.onProjectDescriptionValueChanged = this.onProjectDescriptionValueChanged.bind(
      this
    );
    this.onSubmit = this.onSubmit.bind(this);

    this.onSubmitValidationCompleted = this.onSubmitValidationCompleted.bind(
      this
    );

    this.trackProjectNameBadRequestResponse = this.trackProjectNameBadRequestResponse.bind(
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

  trackProjectNameBadRequestResponse() {
    if (
      this.props.badRequestResponseJson &&
      this.props.badRequestResponseJson.projectNameRemote
    ) {
      this.setState({
        ...this.state,
        projectName: {
          ...this.state.projectName,
          validationState: {
            status: validationStatuses.invalid,
            message: this.props.badRequestResponseJson.projectNameRemote.join(
              ". "
            )
          }
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    // Tracks if any bad request (validation error) received from API
    if (
      prevProps.badRequestResponseJson !== this.props.badRequestResponseJson
    ) {
      this.trackProjectNameBadRequestResponse();
      return true;
    }
    return false;
  }

  onProjectNameValueChanged(event) {
    this.setState({
      projectName: {
        ...this.state.projectName,
        value: event.target.value,
        validationState: validationRulesSetters.validateProjectName(
          event.target.value,
          this.resources
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
          event.target.value,
          this.resources
        )
      }
    });
  }

  onCancel() {
    history.push("/projects/overview");
  }

  onSubmit() {
    this.setState(
      {
        projectName: {
          ...this.state.projectName,
          value: this.state.projectName.value,
          validationState: validationRulesSetters.validateProjectName(
            this.state.projectName.value,
            this.resources
          )
        }
      },
      this.onSubmitValidationCompleted
    );
  }

  onSubmitValidationCompleted() {
    if (validationUtils.focusFirstInvalidField(`#${this.props.id}`) === false) {
      let { projectsAction, projectId } = this.props;

      if (projectsAction) {
        let projectDto = {
          name: this.state.projectName.value,
          description: this.state.projectDescription.value
        };

        // Checking whether projectId needs to be assigned (for update request)
        if (projectId) {
          projectDto["projectId"] = projectId;
        }

        this.props.dispatch(projectsAction({ ...projectDto }));
      }
    }
  }

  render() {
    let { sendingProjectInfo } = this.props;
    //let { buttons, labels, placeholders } = this.resources.projects.create;
    return (
      <Form id={this.props.id} className="col-12">
        {sendingProjectInfo && <Loading text={this.props.loadingText} />}
        <FormGroup>
          <TextBox
            {...this.state.projectName}
            type="text"
            label="Project name"
            placeholder="Enter project name"
          />
        </FormGroup>

        <FormGroup>
          <TextArea
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
                  <Button className="col" onClick={this.onSubmit}>
                    {this.props.submitButtonText}
                  </Button>
                </Col>
                <Col className="pt-2 pb-2">
                  <Button className="col" onClick={this.onCancel}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Alignment between */}
          {/* <Row>
              <Col className="pt-2 pb-2">
                <Button className="col-sm-4 col-12">Create</Button>
              </Col>
              <Col className="pt-2 pb-2 d-flex justify-content-end">
                <Button className="col-sm-4 col-12" onClick={this.cancel}>
                  Cancel
                </Button>
              </Col>
            </Row> */}
        </FormGroup>
      </Form>
    );
  }
}

const connectedCreateProjectForm = connect(mapStateToProps)(ProjectForm);
export { connectedCreateProjectForm as ProjectForm };
