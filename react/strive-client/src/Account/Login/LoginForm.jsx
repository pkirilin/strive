import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, FormGroup, Button } from "reactstrap";
import { Loading, TextBox, CheckBox } from "../../_components";
import { validationStatuses } from "../../_constants";
import {
  validationUtils,
  validationRulesSetters
} from "../../_helpers/validation";
import { accountActions, alertActions } from "../../_actions";

const mapStateToProps = state => {
  const { loggingIn } = state.accountReducer.loginReducer;
  return { loggingIn };
};

class LoginForm extends React.Component {
  static propTypes = {
    loggingIn: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.resources = this.props.resources;

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
          this.resources.account.login
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
          this.resources.account.login
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
      this.props.dispatch(
        accountActions.login({
          email: this.state.email.value,
          password: this.state.password.value,
          rememberMe: this.state.rememberMe.checked
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
            this.resources.account.login
          )
        },
        password: {
          ...this.state.password,
          validationState: validationRulesSetters.validatePassword(
            this.state.password.value,
            this.resources.account.login
          )
        }
      },
      this.onSubmitValidationCompleted
    );
  }

  render() {
    const { loggingIn } = this.props;
    let { buttons, labels, links, placeholders } = this.resources.account.login;
    return (
      <Form id="loginForm">
        {loggingIn && <Loading />}
        <FormGroup>
          <TextBox
            {...this.state.email}
            label={labels.email}
            placeholder={placeholders.email}
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

        <CheckBox
          {...this.state.rememberMe}
          id="rememberMe"
          label={labels.rememberMe}
        />

        <FormGroup>
          <Button color="success" className="col" onClick={this.onSubmit}>
            {buttons.signIn}
          </Button>
        </FormGroup>

        <FormGroup className="text-center">
          <Link to="/account/forgot-password">{links.forgotPassword}</Link>
        </FormGroup>

        <FormGroup className="text-center">
          <Link to="/account/register">{links.signUp}</Link>
        </FormGroup>
      </Form>
    );
  }
}

const connectedLoginForm = connect(mapStateToProps)(LoginForm);
export { connectedLoginForm as LoginForm };
export { LoginForm as LoginFormUnconnected };
