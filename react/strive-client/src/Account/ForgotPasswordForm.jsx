import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { InputField } from "../_components/InputField";

export class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <InputField
            type="text"
            label="Email"
            placeholder="Enter email"
            value={this.state.email}
            onValueChange={this.onEmailChange}
            help="Enter your email. You will receive a link to reset your password"
          />
        </FormGroup>

        <Input type="submit" className="btn btn-success" value="Send" />
      </Form>
    );
  }
}
