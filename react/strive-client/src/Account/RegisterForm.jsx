import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { InputField } from "../_components";
import { validationStatuses } from "../_constants";
import { validationRulesSetters } from "../_helpers/validation";
import { validationHelpers } from "../_helpers/validation";

export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
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
      username: {
        ...initFieldObj,
        onValueChange: this.onUsernameChange
      },
      email: {
        ...initFieldObj,
        onValueChange: this.onEmailChange
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
          event.target.value
        )
      }
    });
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

  onPasswordChange(event) {
    this.setState({
      password: {
        ...this.state.password,
        value: event.target.value,
        validationState: validationRulesSetters.validatePassword(
          event.target.value
        )
      },
      passwordConfirm: {
        ...this.state.passwordConfirm,
        validationState: validationRulesSetters.validatePasswordConfirm(
          this.state.passwordConfirm.value,
          event.target.value
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
          this.state.password.value
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
            this.state.username.value
          )
        },
        email: {
          ...this.state.email,
          validationState: validationRulesSetters.validateEmail(
            this.state.email.value
          )
        },
        password: {
          ...this.state.password,
          validationState: validationRulesSetters.validatePassword(
            this.state.password.value
          )
        },
        passwordConfirm: {
          ...this.state.passwordConfirm,
          validationState: validationRulesSetters.validatePasswordConfirm(
            this.state.passwordConfirm.value,
            this.state.password.value
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
            label="Username"
            placeholder="Enter username"
            {...this.state.username}
          />
        </FormGroup>

        <FormGroup>
          <InputField
            type="text"
            label="Email"
            placeholder="Enter email"
            {...this.state.email}
          />
        </FormGroup>

        <FormGroup>
          <InputField
            type="password"
            label="Password"
            placeholder="Enter password"
            {...this.state.password}
          />
        </FormGroup>

        <FormGroup>
          <InputField
            type="password"
            label="Password confirm"
            placeholder="Enter password again"
            {...this.state.passwordConfirm}
          />
        </FormGroup>

        <FormGroup>
          <Input type="submit" className="btn btn-success" value="Sign up" />
        </FormGroup>

        <FormGroup className="text-center">
          <Link to="/account/login">Sign in using an existing account</Link>
        </FormGroup>
      </Form>
    );
  }
}
