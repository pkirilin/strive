import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { TextBox } from "../../_components";
import { validationStatuses } from "../../_constants";
import {
  validationHelpers,
  validationRulesSetters
} from "../../_helpers/validation";
import { getResourcesForCurrentCulture } from "../../_helpers";

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
      resources: getResourcesForCurrentCulture(),
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
          event.target.value,
          this.state.resources
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
      <Form id="forgotPasswordForm" onSubmit={this.onSubmit}>
        <FormGroup>
          <TextBox
            {...this.state.email}
            type="text"
            label={this.state.resources.label.email}
            placeholder={this.state.resources.placeholder.email}
            help={this.state.resources.help.forgotPasswordEmail}
          />
        </FormGroup>

        <Input
          type="submit"
          className="btn btn-success"
          value={this.state.resources.inputValues.send}
        />
      </Form>
    );
  }
}
