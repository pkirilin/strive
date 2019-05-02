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
    this.resources = this.props.resources;

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
          event.target.value,
          this.resources.account.forgotPassword
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
            this.state.email.value,
            this.resources.account.forgotPassword
          )
        }
      },
      this.onSubmitValidationCompleted
    );
  }

  render() {
    let {
      buttons,
      helps,
      labels,
      placeholders
    } = this.resources.account.forgotPassword;
    return (
      <Form id="forgotPasswordForm">
        <FormGroup>
          <TextBox
            {...this.state.email}
            type="text"
            label={labels.email}
            placeholder={placeholders.email}
            help={helps.email}
          />
        </FormGroup>

        <FormGroup>
          <Button color="success" className="col" onClick={this.onSubmit}>
            {buttons.send}
          </Button>
        </FormGroup>
      </Form>
    );
  }
}
