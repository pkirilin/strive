import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { LabeledInput } from "../_components/LabeledInput";

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
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
            value={this.state.email}
            onValueChange={this.onEmailChange}
          />
        </FormGroup>

        <FormGroup>
          <LabeledInput
            type="password"
            label="Password"
            placeholder="Enter password"
            value={this.state.password}
            onValueChange={this.onPasswordChange}
          />
        </FormGroup>

        <FormGroup>
          <Input type="submit" className="btn btn-success" value="Sign in" />
        </FormGroup>

        <FormGroup className="text-center">
          <Link to="/account/register">Create account</Link>
        </FormGroup>
      </Form>
    );
  }
}
