import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Form, FormGroup, Button } from "reactstrap";
import { AppSpinner, AppTextBox, AppCheckBox } from "../../../_components";
import { validationStatuses } from "../../../_constants";
import {
  validationUtils,
  validationRulesSetters
} from "../../../_helpers/validation";

export default class LoginForm extends Component {
  static propTypes = {
    loggingIn: PropTypes.bool,
    clearAlert: PropTypes.func.isRequired,
    performLogin: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onRememberMeCheckedChange = this.onRememberMeCheckedChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitValidationCompleted = this.onSubmitValidationCompleted.bind(
      this
    );

    const initFieldObj = {
      value: "",
      validationState: {
        status: validationStatuses.default,
        message: ""
      }
    };

    this.state = {
      email: {
        ...initFieldObj,
        onChange: this.onEmailChange
      },
      password: {
        ...initFieldObj,
        onChange: this.onPasswordChange
      },
      rememberMe: {
        checked: false,
        onChange: this.onRememberMeCheckedChange
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
        checked: event.target.checked
      }
    });
  }

  onSubmitValidationCompleted() {
    if (validationUtils.focusFirstInvalidField("#loginForm") === false) {
      // Login data is valid
      const { performLogin } = this.props;
      performLogin({
        email: this.state.email.value,
        password: this.state.password.value,
        rememberMe: this.state.rememberMe.checked
      });
    }
  }

  onSubmit(event) {
    const { clearAlert } = this.props;

    event.preventDefault();
    clearAlert();

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
    const { loggingIn } = this.props;
    return (
      <Form id="loginForm">
        {loggingIn && <AppSpinner />}
        <FormGroup>
          <AppTextBox
            {...this.state.email}
            label="Email"
            placeholder="Enter email"
          />
        </FormGroup>

        <FormGroup>
          <AppTextBox
            {...this.state.password}
            type="password"
            label="Password"
            placeholder="Enter password"
          />
        </FormGroup>

        <AppCheckBox
          {...this.state.rememberMe}
          id="rememberMe"
          label="Remember me"
        />

        <FormGroup>
          <Button color="success" className="col" onClick={this.onSubmit}>
            Sign in
          </Button>
        </FormGroup>

        {/* <FormGroup className="text-center">
          <Link to="/account/forgot-password">Forgot password?</Link>
        </FormGroup> */}

        <FormGroup className="text-center">
          <Link to="/account/register">Sign up</Link>
        </FormGroup>
      </Form>
    );
  }
}
