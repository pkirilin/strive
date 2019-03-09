import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { LabeledInput } from "../_components/LabeledInput";

export class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: "",
      newPasswordConfirm: ""
    };

    this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
    this.onNewPasswordConfirmChange = this.onNewPasswordConfirmChange.bind(
      this
    );
    this.onSubmit = this.onSubmit.bind(this);
  }

  onNewPasswordChange(event) {
    this.setState({
      newPassword: event.target.value
    });
  }

  onNewPasswordConfirmChange(event) {
    this.setState({
      newPasswordConfirm: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <LabeledInput type="text" label="Email" value="test" readonly />
        </FormGroup>

        <FormGroup>
          <LabeledInput
            type="password"
            label="New password"
            placeholder="Enter new password"
            value={this.state.newPassword}
            onValueChange={this.onNewPasswordChange}
          />
        </FormGroup>

        <FormGroup>
          <LabeledInput
            type="password"
            label="New password confirm"
            placeholder="Enter new password again"
            value={this.state.newPasswordConfirm}
            onValueChange={this.onNewPasswordConfirmChange}
          />
        </FormGroup>

        <Input type="submit" className="btn btn-success" value="Send" />
      </Form>
    );
  }
}
