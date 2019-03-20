import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { InputField } from "../_components/InputField";
import { validationStatuses } from "../_constants";
import {
  validationHelpers,
  validationRulesSetters
} from "../_helpers/validation";

export class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.onSubmitValidationCompleted = this.onSubmitValidationCompleted.bind(
      this
    );

    let initObj = {
      value: "",
      validationState: {
        status: validationStatuses.default
      }
    };

    this.state = {
      email: { ...initObj }
    };
  }

  onEmailChange(event) {
    this.setState({
      email: {
        ...this.state.email,
        value: event.target.value,
        validationState: validationRulesSetters.validateEmail(
          event.target.value
        )
      }
    });
  }

  onSubmitValidationCompleted() {
    validationHelpers.focusFirstInvalidField("#forgotPasswordForm");
  }

  onSubmit(event) {
    event.preventDefault();

    this.setState(
      {
        email: {
          ...this.state.email,
          validationState: validationRulesSetters.validateEmail(
            this.state.email.value
          )
        }
      },
      this.onSubmitValidationCompleted
    );
  }

  render() {
    return (
      <Form id="forgotPasswordForm" onSubmit={this.onSubmit}>
        <FormGroup>
          <InputField
            type="text"
            label="Email"
            placeholder="Enter email"
            value={this.state.email.value}
            onValueChange={this.onEmailChange}
            validationState={this.state.email.validationState}
            help="Enter your email. You will receive a link to reset your password"
          />
        </FormGroup>

        <Input type="submit" className="btn btn-success" value="Send" />
      </Form>
    );
  }
}
