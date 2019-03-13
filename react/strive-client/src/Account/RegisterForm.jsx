import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { InputField } from "../_components/InputField";

export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirm: ""
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
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

  onPasswordConfirmChange(event) {
    this.setState({
      passwordConfirm: event.target.value
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
            label="Username"
            placeholder="Enter username"
            value={this.state.username}
            onValueChange={this.onUsernameChange}
          />
        </FormGroup>

        <FormGroup>
          <InputField
            type="text"
            label="Email"
            placeholder="Enter email"
            value={this.state.email}
            onValueChange={this.onEmailChange}
          />
        </FormGroup>

        <FormGroup>
          <InputField
            type="password"
            label="Password"
            placeholder="Enter password"
            value={this.state.password}
            onValueChange={this.onPasswordChange}
          />
        </FormGroup>

        <FormGroup>
          <InputField
            type="password"
            label="Password confirm"
            placeholder="Enter password again"
            value={this.state.passwordConfirm}
            onValueChange={this.onPasswordConfirmChange}
          />
        </FormGroup>

        <FormGroup>
          <Input type="submit" className="btn btn-success" value="Sign up" />
        </FormGroup>

        <FormGroup className="text-center">
          <Link to="/account/login">Sign in using an existing account</Link>
        </FormGroup>
      </Form>
    );
  }
}
