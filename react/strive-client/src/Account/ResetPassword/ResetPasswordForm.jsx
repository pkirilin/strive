import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { TextBox } from "../../_components";
import { validationStatuses } from "../../_constants";
import {
  validationHelpers,
  validationRulesSetters
} from "../../_helpers/validation";
import { getResourcesForCurrentCulture } from "../../_helpers";

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
      resources: getResourcesForCurrentCulture(),
      email: {
        value: "test@test.com"
      },
      newPassword: {
        ...initObj,
        onChange: this.onNewPasswordChange
      },
      newPasswordConfirm: {
        ...initObj,
        onChange: this.onNewPasswordConfirmChange
      }
    };
  }

  onNewPasswordChange(event) {
    this.setState({
      newPassword: {
        ...this.state.newPassword,
        value: event.target.value,
        validationState: validationRulesSetters.validatePassword(
          event.target.value,
          this.state.resources
        )
      },
      newPasswordConfirm: {
        ...this.state.newPasswordConfirm,
        validationState: validationRulesSetters.validatePasswordConfirm(
          this.state.newPasswordConfirm.value,
          event.target.value,
          this.state.resources
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
          this.state.newPassword.value,
          this.state.resources
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
            this.state.newPassword.value,
            this.state.resources
          )
        },
        newPasswordConfirm: {
          ...this.state.newPasswordConfirm,
          validationState: validationRulesSetters.validatePasswordConfirm(
            this.state.newPasswordConfirm.value,
            this.state.newPassword.value,
            this.state.resources
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
          <TextBox
            {...this.state.email}
            type="text"
            label={this.state.resources.label.email}
            readonly
          />
        </FormGroup>

        <FormGroup>
          <TextBox
            {...this.state.newPassword}
            type="password"
            label={this.state.resources.label.newPassword}
            placeholder={this.state.resources.placeholder.newPassword}
          />
        </FormGroup>

        <FormGroup>
          <TextBox
            {...this.state.newPasswordConfirm}
            type="password"
            label={this.state.resources.label.newPasswordConfirm}
            placeholder={this.state.resources.placeholder.newPasswordConfirm}
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
