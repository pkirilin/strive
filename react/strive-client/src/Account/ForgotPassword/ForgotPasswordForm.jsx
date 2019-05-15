import React from "react";
import { Form, FormGroup, Button } from "reactstrap";
import { TextBox } from "../../_components";
import { validationStatuses } from "../../_constants";
import {
  validationUtils,
  validationRulesSetters
} from "../../_helpers/validation";

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
      email: {
        ...initObj,
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
          event.target.value
        )
      }
    });
  }

  onSubmitValidationCompleted() {
    validationUtils.focusFirstInvalidField("#forgotPasswordForm");
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
      <Form id="forgotPasswordForm">
        <FormGroup>
          <TextBox
            {...this.state.email}
            type="text"
            label="Email"
            placeholder="Enter email"
            help="Enter your email. You will receive a link to reset your password"
          />
        </FormGroup>

        <FormGroup>
          <Button color="success" className="col" onClick={this.onSubmit}>
            Send
          </Button>
        </FormGroup>
      </Form>
    );
  }
}
