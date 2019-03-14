import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { InputField } from "../_components/InputField";
import { validationStatuses, validationRules } from "../_constants/validation";
import { validationResources } from "../_resources";

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: {
        value: "",
        validationState: {
          status: validationStatuses.default,
          message: ""
        }
      },
      password: {
        value: "",
        validationState: {
          status: validationStatuses.default,
          message: ""
        }
      }
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onEmailChange(event) {
    this.setState({
      email: {
        value: event.target.value,
        validationState: validationRules.multiple([
          validationRules.required(
            event.target.value,
            validationResources.invalid.email.required.message
          ),
          validationRules.lengthRange(
            event.target.value,
            validationResources.invalid.email.lengthRange.min,
            validationResources.invalid.email.lengthRange.max,
            validationResources.invalid.email.lengthRange.message
          )
        ])
      }
    });
  }

  onPasswordChange(event) {
    let value = event.target.value;

    this.setState({
      password: {
        value: value
      }
    });
  }

  onSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Form method="post" onSubmit={this.onSubmit}>
        <FormGroup>
          <InputField
            type="text"
            label="Email"
            placeholder="Enter email"
            value={this.state.email.value}
            onValueChange={this.onEmailChange}
            validationState={this.state.email.validationState}
          />
        </FormGroup>

        <FormGroup>
          <InputField
            type="password"
            label="Password"
            placeholder="Enter password"
            value={this.state.password.value}
            onValueChange={this.onPasswordChange}
            validationState={this.state.password.validationState}
          />
        </FormGroup>

        <FormGroup>
          <Input type="submit" className="btn btn-success" value="Sign in" />
        </FormGroup>

        <FormGroup className="text-center">
          <Link to="/account/forgot-password">Forgot password?</Link>
        </FormGroup>

        <FormGroup className="text-center">
          <Link to="/account/register">Create account</Link>
        </FormGroup>
      </Form>
    );
  }
}
