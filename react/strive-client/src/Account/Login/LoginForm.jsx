import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input } from "reactstrap";
import { Loading, TextBox, CheckBox } from "../../_components";
import { validationStatuses } from "../../_constants";
import { getResourcesForCurrentCulture } from "../../_helpers";
import {
  validationHelpers,
  validationRulesSetters
} from "../../_helpers/validation";
import { accountActions, alertActions } from "../../_actions";

const mapStateToProps = state => {
  const { loggingIn } = state.accountReducer.loginReducer;
  return { loggingIn };
};

class LoginForm extends React.Component {
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
        onChange: this.onEmailChange,
        value: "test@test.com"
      },
      password: {
        ...initFieldObj,
        onChange: this.onPasswordChange,
        value: "1"
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
    if (validationHelpers.focusFirstInvalidField("#loginForm") === false) {
      // Login data is valid
      this.props.dispatch(
        accountActions.login({
          email: this.state.email.value,
          password: this.state.password.value,
          rememberMe: this.state.rememberMe.value
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
        password: {
          ...this.state.password,
          validationState: validationRulesSetters.validatePassword(
            this.state.password.value,
            this.state.resources
          )
        }
      },
      this.onSubmitValidationCompleted
    );
  }

  render() {
    const { loggingIn } = this.props;

    return (
      <Form id="loginForm" method="post" onSubmit={this.onSubmit}>
        {loggingIn && <Loading />}
        <FormGroup>
          <TextBox
            {...this.state.email}
            label={this.state.resources.label.email}
            placeholder={this.state.resources.placeholder.email}
          />
        </FormGroup>

        <FormGroup>
          <TextBox
            {...this.state.password}
            type="password"
            label={this.state.resources.label.password}
            placeholder={this.state.resources.placeholder.password}
          />
        </FormGroup>

        <CheckBox
          {...this.state.rememberMe}
          id="rememberMe"
          label={this.state.resources.label.rememberMe}
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
          <Link to="/account/register">{this.state.resources.link.signUp}</Link>
        </FormGroup>
      </Form>
    );
  }
}

const connectedLoginForm = connect(mapStateToProps)(LoginForm);
export { connectedLoginForm as LoginForm };
export { LoginForm as LoginFormUnconnected };
