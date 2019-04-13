import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { InputField, Loading } from "../_components";
import { validationStatuses } from "../_constants";
import { validationRulesSetters } from "../_helpers/validation";
import { validationHelpers } from "../_helpers/validation";
import { getResourcesForCurrentCulture } from "../_helpers";
import { connect } from "react-redux";
import { accountActions, alertActions } from "../_actions";

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
      resources: getResourcesForCurrentCulture(),
      email: {
        ...initFieldObj,
        onValueChange: this.onEmailChange
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
          this.state.resources
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
            this.state.resources
          )
        },
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
    const { registering } = this.props;
    return (
      <Form id="registerForm" method="post" onSubmit={this.onSubmit}>
        {registering && <Loading />}
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

const connectedRegisterForm = connect(mapStateToProps)(RegisterForm);
export { connectedRegisterForm as RegisterForm };
