import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { InputField, InputCheckbox } from "../_components";
import { validationStatuses } from "../_constants";
import {
  validationHelpers,
  validationRulesSetters
} from "../_helpers/validation";
import { getResourcesForCurrentCulture } from "../_helpers";

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onRememberMeCheckedChange = this.onRememberMeCheckedChange.bind(this);
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
        onValueChange: this.onEmailChange
      },
      password: {
        ...initFieldObj,
        onValueChange: this.onPasswordChange
      },
      rememberMe: {
        value: false,
        onCheckedChange: this.onRememberMeCheckedChange
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

  onPasswordChange(event) {
    this.setState({
      password: {
        ...this.state.password,
        value: event.target.value,
        validationState: validationRulesSetters.validatePassword(
          event.target.value
        )
      }
    });
  }

  onRememberMeCheckedChange(event) {
    this.setState({
      rememberMe: {
        ...this.state.rememberMe,
        value: event.target.checked
      }
    });
  }

  onSubmitValidationCompleted() {
    if (validationHelpers.focusFirstInvalidField("#loginForm") === false) {
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
            this.state.email.value
          )
        },
        password: {
          ...this.state.password,
          validationState: validationRulesSetters.validatePassword(
            this.state.password.value
          )
        }
      },
      this.onSubmitValidationCompleted
    );
  }

  render() {
    return (
      <Form id="loginForm" method="post" onSubmit={this.onSubmit}>
        <FormGroup>
          <InputField
            type="text"
            label={this.state.resources.label.email}
            placeholder={this.state.resources.placeholder.email}
            {...this.state.email}
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

        <InputCheckbox
          id="rememberMe"
          label={this.state.resources.label.rememberMe}
          {...this.state.rememberMe}
        />

        <FormGroup>
          <Input
            type="submit"
            className="btn btn-success"
            value={this.state.resources.inputValues.signIn}
          />
        </FormGroup>

        <FormGroup className="text-center">
          <Link to="/account/forgot-password">
            {this.state.resources.link.forgotPassword}
          </Link>
        </FormGroup>

        <FormGroup className="text-center">
          <Link to="/account/register">
            {this.state.resources.link.createAccount}
          </Link>
        </FormGroup>
      </Form>
    );
  }
}
