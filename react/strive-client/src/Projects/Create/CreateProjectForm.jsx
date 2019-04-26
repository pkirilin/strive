import React from "react";
import { Form, FormGroup, Button, Row, Col } from "reactstrap";
import { TextBox, TextArea } from "../../_components";
import { history } from "../../_helpers";
import { validationStatuses } from "../../_constants";
import {
  validationRulesSetters,
  validationUtils
} from "../../_helpers/validation";

export class CreateProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.resources = this.props.resources;

    this.onProjectNameValueChanged = this.onProjectNameValueChanged.bind(this);
    this.onProjectDescriptionValueChanged = this.onProjectDescriptionValueChanged.bind(
      this
    );
    this.onCreate = this.onCreate.bind(this);
    this.onCreateValidationCompleted = this.onCreateValidationCompleted.bind(
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

  onCreate() {
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
      this.onCreateValidationCompleted
    );
  }

  onCreateValidationCompleted() {
    validationUtils.focusFirstInvalidField("#createProjectForm");
  }

  render() {
    return (
      <Form id="createProjectForm" className="col-12">
        <FormGroup>
          <TextBox
            {...this.state.projectName}
            type="text"
            label="Name"
            placeholder="Enter project's name"
          />
        </FormGroup>

        <FormGroup>
          <TextArea
            {...this.state.projectDescription}
            label="Description"
            placeholder="Enter project's description"
          />
        </FormGroup>

        <FormGroup className="">
          {/* Alignment right */}
          <Row>
            <Col sm={{ size: 6, offset: 6 }} xs={{ size: 12, offset: 0 }}>
              <Row>
                <Col className="pt-2 pb-2">
                  <Button className="col" onClick={this.onCreate}>
                    Create
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
