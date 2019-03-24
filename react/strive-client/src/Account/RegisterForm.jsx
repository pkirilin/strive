import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { InputField } from "../_components";
import { validationStatuses } from "../_constants";
import { validationRulesSetters } from "../_helpers/validation";
import { validationHelpers } from "../_helpers/validation";
import { getResourcesForCurrentCulture } from "../_helpers";

export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.onSubmitValidationCompleted = this.onSubmitValidationCompleted.bind(
      this
    );

    let initFieldObj = {
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
      username: {
        ...initFieldObj,
        onValueChange: this.onUsernameChange
      },
      password: {
        ...initFieldObj,
        onValueChange: this.onPasswordChange
      },
      passwordConfirm: {
        ...initFieldObj,
        onValueChange: this.onPasswordConfirmChange
      }
    };
  }

  onUsernameChange(event) {
    this.setState({
      username: {
        ...this.state.username,
        value: event.target.value,
        validationState: validationRulesSetters.validateUsername(
          event.target.value,
          this.state.resources
        )
      }
    });
  }

  onPasswordChange(event) {
    this.setState({
      password: {
        ...this.state.password,
        value: event.target.value,
        validationState: validationRulesSetters.validatePassword(
          event.target.value,
          this.state.resources
        )
      },
      passwordConfirm: {
        ...this.state.passwordConfirm,
        validationState: validationRulesSetters.validatePasswordConfirm(
          this.state.passwordConfirm.value,
          event.target.value,
          this.state.resources
        )
      }
    });
  }

  onPasswordConfirmChange(event) {
    this.setState({
      passwordConfirm: {
        ...this.state.passwordConfirm,
        value: event.target.value,
        validationState: validationRulesSetters.validatePasswordConfirm(
          event.target.value,
          this.state.password.value,
          this.state.resources
        )
      }
    });
  }

  onSubmitValidationCompleted() {
    if (validationHelpers.focusFirstInvalidField("#registerForm") === false) {
      // form valid
    }
  }

  onSubmit(event) {
    event.preventDefault();

    this.setState(
      {
        username: {
          ...this.state.username,
          validationState: validationRulesSetters.validateUsername(
            this.state.username.value,
            this.state.resources
          )
        },
        password: {
          ...this.state.password,
          validationState: validationRulesSetters.validatePassword(
            this.state.password.value,
            this.state.resources
          )
        },
        passwordConfirm: {
          ...this.state.passwordConfirm,
          validationState: validationRulesSetters.validatePasswordConfirm(
            this.state.passwordConfirm.value,
            this.state.password.value,
            this.state.resources
          )
        }
      },
      this.onSubmitValidationCompleted
    );
  }

  render() {
    return (
      <Form id="registerForm" method="post" onSubmit={this.onSubmit}>
        <FormGroup>
          <InputField
            type="text"
            label={this.state.resources.label.email}
            readonly
            {...this.state.email}
          />
        </FormGroup>

        <FormGroup>
          <InputField
            type="text"
            label={this.state.resources.label.username}
            placeholder={this.state.resources.placeholder.username}
            {...this.state.username}
          />
        </FormGroup>

        <FormGroup>
          <InputField
            type="password"
            label={this.state.resources.label.password}
            placeholder={this.state.resources.placeholder.password}
            {...this.state.password}
          />
        </FormGroup>

        <FormGroup>
          <InputField
            type="password"
            label={this.state.resources.label.passwordConfirm}
            placeholder={this.state.resources.placeholder.passwordConfirm}
            {...this.state.passwordConfirm}
          />
        </FormGroup>

        <FormGroup>
          <Input
            type="submit"
            className="btn btn-success"
            value={this.state.resources.inputValues.createAccount}
          />
        </FormGroup>
      </Form>
    );
  }
}
