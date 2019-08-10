import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Form, FormGroup, Button } from "reactstrap";
import { Spinner, AppTextBox } from "../../../_components";
import { validationStatuses } from "../../../_constants";
import {
  validationRulesSetters,
  validationUtils
} from "../../../_helpers/validation";

export default class RegisterForm extends Component {
  static propTypes = {
    registering: PropTypes.bool,
    badRequestResponse: PropTypes.shape({
      emailRemote: PropTypes.arrayOf(PropTypes.string),
      usernameRemote: PropTypes.arrayOf(PropTypes.string)
    }),
    clearAlert: PropTypes.func,
    performRegister: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitValidationCompleted = this.onSubmitValidationCompleted.bind(
      this
    );

    this.handleEmailBadRequestResponse = this.handleEmailBadRequestResponse.bind(
      this
    );
    this.handleUsernameBadRequestResponse = this.handleUsernameBadRequestResponse.bind(
      this
    );

    let initFieldObj = {
      value: "",
      validationState: {
        status: validationStatuses.default
      }
    };

    this.state = {
      email: {
        ...initFieldObj,
        onChange: this.onEmailChange
      },
      username: {
        ...initFieldObj,
        onChange: this.onUsernameChange
      },
      password: {
        ...initFieldObj,
        onChange: this.onPasswordChange
      },
      passwordConfirm: {
        ...initFieldObj,
        onChange: this.onPasswordConfirmChange
      }
    };
  }

  handleEmailBadRequestResponse(errors) {
    if (errors && errors.emailRemote) {
      this.setState({
        ...this.state,
        email: {
          ...this.state.email,
          validationState: {
            status: validationStatuses.invalid,
            message: errors.emailRemote.join(". ")
          }
        }
      });
    }
  }

  handleUsernameBadRequestResponse(errors) {
    if (errors && errors.usernameRemote) {
      this.setState({
        ...this.state,
        username: {
          ...this.state.username,
          validationState: {
            status: validationStatuses.invalid,
            message: errors.usernameRemote.join(". ")
          }
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    // Tracks if any bad request (validation error) received from API
    if (prevProps.badRequestResponse !== this.props.badRequestResponse) {
      const { badRequestResponse: errors } = this.props;
      this.handleEmailBadRequestResponse(errors);
      this.handleUsernameBadRequestResponse(errors);
      return true;
    }
    return false;
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

  onPasswordChange(event) {
    let passwordValidationState = validationRulesSetters.validatePassword(
      event.target.value
    );
    this.setState({
      password: {
        ...this.state.password,
        value: event.target.value,
        validationState: passwordValidationState
      },
      passwordConfirm: {
        ...this.state.passwordConfirm,
        validationState: validationRulesSetters.validatePasswordConfirm(
          this.state.passwordConfirm.value,
          event.target.value,
          passwordValidationState.status
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
          this.state.password.validationState.status
        )
      }
    });
  }

  onSubmitValidationCompleted() {
    if (validationUtils.focusFirstInvalidField("#registerForm") === false) {
      // Registration data is valid
      const { performRegister } = this.props;
      performRegister({
        email: this.state.email.value,
        username: this.state.username.value,
        password: this.state.password.value,
        passwordConfirm: this.state.passwordConfirm.value
      });
    }
  }

  onSubmit(event) {
    const { clearAlert } = this.props;

    event.preventDefault();
    clearAlert();

    let passwordValidationState = validationRulesSetters.validatePassword(
      this.state.password.value
    );

    this.setState(
      {
        email: {
          ...this.state.email,
          validationState: validationRulesSetters.validateEmail(
            this.state.email.value
          )
        },
        username: {
          ...this.state.username,
          validationState: validationRulesSetters.validateUsername(
            this.state.username.value
          )
        },
        password: {
          ...this.state.password,
          validationState: passwordValidationState
        },
        passwordConfirm: {
          ...this.state.passwordConfirm,
          validationState: validationRulesSetters.validatePasswordConfirm(
            this.state.passwordConfirm.value,
            this.state.password.value,
            passwordValidationState.status
          )
        }
      },
      this.onSubmitValidationCompleted
    );
  }

  render() {
    const { registering } = this.props;
    return (
      <Form id="registerForm">
        {registering && <Spinner />}
        <FormGroup>
          <AppTextBox
            {...this.state.email}
            type="text"
            label="Email"
            placeholder="Enter email"
          />
        </FormGroup>

        <FormGroup>
          <AppTextBox
            {...this.state.username}
            type="text"
            label="Username"
            placeholder="Enter username"
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

        <FormGroup>
          <AppTextBox
            {...this.state.passwordConfirm}
            type="password"
            label="Password confirm"
            placeholder="Enter password again"
          />
        </FormGroup>

        <FormGroup>
          <Button color="success" className="col" onClick={this.onSubmit}>
            Create account
          </Button>
        </FormGroup>

        <FormGroup className="text-center">
          <Link to="/account/login">Sign in</Link>
        </FormGroup>
      </Form>
    );
  }
}
