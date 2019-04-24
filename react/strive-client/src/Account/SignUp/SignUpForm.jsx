import React from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input } from "reactstrap";
import { TextBox } from "../../_components";
import { validationStatuses } from "../../_constants";
import {
  validationHelpers,
  validationRulesSetters
} from "../../_helpers/validation";
import { getResourcesForCurrentCulture } from "../../_helpers";

export class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.onEmailChange = this.onEmailChange.bind(this);
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
      resources: getResourcesForCurrentCulture(),
      email: {
        ...initFieldObj,
        onChange: this.onEmailChange
      }
    };
  }

  onEmailChange(event) {
    this.setState({
      email: {
        ...this.state.email,
        value: event.target.value,
        validationState: validationRulesSetters.validateEmail(
          event.target.value,
          this.state.resources
        )
      }
    });
  }

  onSubmitValidationCompleted() {
    if (validationHelpers.focusFirstInvalidField("#signUpForm") === false) {
      // form valid
    }
  }

  onSubmit(event) {
    event.preventDefault();

    this.setState(
      {
        email: {
          ...this.state.email,
          validationState: validationRulesSetters.validateEmail(
            this.state.email.value,
            this.state.resources
          )
        }
      },
      this.onSubmitValidationCompleted
    );
  }

  render() {
    return (
      <Form id="signUpForm" method="post" onSubmit={this.onSubmit}>
        <FormGroup>
          <TextBox
            {...this.state.email}
            type="text"
            label={this.state.resources.label.email}
            placeholder={this.state.resources.placeholder.email}
            help={this.state.resources.help.signUpEmail}
          />
        </FormGroup>

        <FormGroup>
          <Input
            type="submit"
            className="btn btn-success"
            value={this.state.resources.inputValues.signUp}
          />
        </FormGroup>

        <FormGroup className="text-center">
          <Link to="/account/login">
            {this.state.resources.link.signInAccount}
          </Link>
        </FormGroup>
      </Form>
    );
  }
}
