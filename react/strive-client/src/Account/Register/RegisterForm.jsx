import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input } from "reactstrap";
import { Loading, TextBox } from "../../_components";
import { validationStatuses } from "../../_constants";
import {
  validationRulesSetters,
  validationUtils
} from "../../_helpers/validation";
import { accountActions, alertActions } from "../../_actions";

const mapStateToProps = state => {
  const {
    registering,
    badRequestResponseJson
  } = state.accountReducer.registerReducer;
  return {
    registering,
    badRequestResponseJson
  };
};

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.resources = this.props.resources;

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.onSubmitValidationCompleted = this.onSubmitValidationCompleted.bind(
      this
    );

    this.trackEmailBadRequestResponse = this.trackEmailBadRequestResponse.bind(
      this
    );
    this.trackUsernameBadRequestResponse = this.trackUsernameBadRequestResponse.bind(
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

  trackEmailBadRequestResponse() {
    if (
      this.props.badRequestResponseJson &&
      this.props.badRequestResponseJson.emailRemote
    ) {
      this.setState({
        ...this.state,
        email: {
          ...this.state.email,
          validationState: {
            status: validationStatuses.invalid,
            message: this.props.badRequestResponseJson.emailRemote.join(". ")
          }
        }
      });
    }
  }

  trackUsernameBadRequestResponse() {
    if (
      this.props.badRequestResponseJson &&
      this.props.badRequestResponseJson.usernameRemote
    ) {
      this.setState({
        ...this.state,
        username: {
          ...this.state.username,
          validationState: {
            status: validationStatuses.invalid,
            message: this.props.badRequestResponseJson.usernameRemote.join(". ")
          }
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    // Tracks if any bad request (validation error) received from API
    if (
      prevProps.badRequestResponseJson !== this.props.badRequestResponseJson
    ) {
      this.trackEmailBadRequestResponse();
      this.trackUsernameBadRequestResponse();
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
          event.target.value,
          this.resources.account.register
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
          event.target.value,
          this.resources.account.register
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
          this.resources.account.register
        )
      },
      passwordConfirm: {
        ...this.state.passwordConfirm,
        validationState: validationRulesSetters.validatePasswordConfirm(
          this.state.passwordConfirm.value,
          event.target.value,
          this.resources.account.register
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
          this.resources.account.register
        )
      }
    });
  }

  onSubmitValidationCompleted() {
    if (validationUtils.focusFirstInvalidField("#registerForm") === false) {
      // Registration data is valid
      this.props.dispatch(
        accountActions.register({
          email: this.state.email.value,
          username: this.state.username.value,
          password: this.state.password.value,
          passwordConfirm: this.state.passwordConfirm.value
        })
      );
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.dispatch(alertActions.clear());

    this.setState(
      {
        email: {
          ...this.state.email,
          validationState: validationRulesSetters.validateEmail(
            this.state.email.value,
            this.resources.account.register
          )
        },
        username: {
          ...this.state.username,
          validationState: validationRulesSetters.validateUsername(
            this.state.username.value,
            this.resources.account.register
          )
        },
        password: {
          ...this.state.password,
          validationState: validationRulesSetters.validatePassword(
            this.state.password.value,
            this.resources.account.register
          )
        },
        passwordConfirm: {
          ...this.state.passwordConfirm,
          validationState: validationRulesSetters.validatePasswordConfirm(
            this.state.passwordConfirm.value,
            this.state.password.value,
            this.resources.account.register
          )
        }
      },
      this.onSubmitValidationCompleted
    );
  }

  render() {
    const { registering } = this.props;
    let {
      buttons,
      labels,
      links,
      placeholders
    } = this.resources.account.register;
    return (
      <Form id="registerForm" method="post" onSubmit={this.onSubmit}>
        {registering && <Loading />}
        <FormGroup>
          <TextBox
            {...this.state.email}
            type="text"
            label={labels.email}
            placeholder={placeholders.email}
          />
        </FormGroup>

        <FormGroup>
          <TextBox
            {...this.state.username}
            type="text"
            label={labels.username}
            placeholder={placeholders.username}
          />
        </FormGroup>

        <FormGroup>
          <TextBox
            {...this.state.password}
            type="password"
            label={labels.password}
            placeholder={placeholders.password}
          />
        </FormGroup>

        <FormGroup>
          <TextBox
            {...this.state.passwordConfirm}
            type="password"
            label={labels.passwordConfirm}
            placeholder={placeholders.passwordConfirm}
          />
        </FormGroup>

        <FormGroup>
          <Input
            type="submit"
            className="btn btn-success"
            value={buttons.createAccount}
          />
        </FormGroup>

        <FormGroup className="text-center">
          <Link to="/account/login">{links.signIn}</Link>
        </FormGroup>
      </Form>
    );
  }
}

const connectedRegisterForm = connect(mapStateToProps)(RegisterForm);
export { connectedRegisterForm as RegisterForm };
export { RegisterForm as RegisterFormUnconnected };
