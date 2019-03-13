import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { LabeledInput } from "../_components/LabeledInput";
import { validationStates, validationRules } from "../_constants/validation";

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: {
        value: "",
        validationState: {
          status: validationStates.default,
          message: ""
        }
      },
      password: {
        value: "",
        validationState: {
          status: validationStates.default,
          message: ""
        }
      }
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onEmailChange(event) {
    let value = event.target.value;

    this.setState({
      email: {
        value: value,
        validationState: validationRules.multiple([
          validationRules.required(value, "Email is required"),
          validationRules.lengthRange(value, 3, 10, "Email length [3, 10]")
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
          <LabeledInput
            type="text"
            label="Email"
            placeholder="Enter email"
            value={this.state.email.value}
            onValueChange={this.onEmailChange}
            validationState={this.state.email.validationState}
          />
        </FormGroup>

        <FormGroup>
          <LabeledInput
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
