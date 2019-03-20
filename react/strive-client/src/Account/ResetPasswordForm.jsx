import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { InputField } from "../_components";
import { validationStatuses } from "../_constants";
import {
  validationHelpers,
  validationRulesSetters
} from "../_helpers/validation";

export class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);

    this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
    this.onNewPasswordConfirmChange = this.onNewPasswordConfirmChange.bind(
      this
    );
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
      newPassword: {
        ...initObj,
        onValueChange: this.onNewPasswordChange
      },
      newPasswordConfirm: {
        ...initObj,
        onValueChange: this.onNewPasswordConfirmChange
      }
    };
  }

  onNewPasswordChange(event) {
    this.setState({
      newPassword: {
        ...this.state.newPassword,
        value: event.target.value,
        validationState: validationRulesSetters.validatePassword(
          event.target.value
        )
      },
      newPasswordConfirm: {
        ...this.state.newPasswordConfirm,
        validationState: validationRulesSetters.validatePasswordConfirm(
          this.state.newPasswordConfirm.value,
          event.target.value
        )
      }
    });
  }

  onNewPasswordConfirmChange(event) {
    this.setState({
      newPasswordConfirm: {
        ...this.state.newPasswordConfirm,
        value: event.target.value,
        validationState: validationRulesSetters.validatePasswordConfirm(
          event.target.value,
          this.state.newPassword.value
        )
      }
    });
  }

  onSubmitValidationCompleted() {
    if (
      validationHelpers.focusFirstInvalidField("#resetPasswordForm") === false
    ) {
      // form valid
    }
  }

  onSubmit(event) {
    event.preventDefault();

    this.setState(
      {
        newPassword: {
          ...this.state.newPassword,
          validationState: validationRulesSetters.validatePassword(
            this.state.newPassword.value
          )
        },
        newPasswordConfirm: {
          ...this.state.newPasswordConfirm,
          validationState: validationRulesSetters.validatePasswordConfirm(
            this.state.newPasswordConfirm.value
          )
        }
      },
      this.onSubmitValidationCompleted
    );
  }

  render() {
    return (
      <Form id="resetPasswordForm" onSubmit={this.onSubmit}>
        <FormGroup>
          <InputField
            type="text"
            label="Email"
            value={this.props.emailValue}
            readonly
          />
        </FormGroup>

        <FormGroup>
          <InputField
            type="password"
            label="New password"
            placeholder="Enter new password"
            {...this.state.newPassword}
          />
        </FormGroup>

        <FormGroup>
          <InputField
            type="password"
            label="New password confirm"
            placeholder="Enter new password again"
            {...this.state.newPasswordConfirm}
          />
        </FormGroup>

        <Input type="submit" className="btn btn-success" value="Send" />
      </Form>
    );
  }
}
