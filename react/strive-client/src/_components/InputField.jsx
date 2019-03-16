import React from "react";
import { Label } from "reactstrap";
import { validationStatuses } from "../_constants/validation";

export class InputField extends React.Component {
  static defaultProps = {
    validationState: {
      status: validationStatuses.default
    }
  };

  render() {
    let inputClasses = [
      this.props.readonly ? "form-control-plaintext" : "form-control"
    ];

    let messageClasses = [];

    switch (this.props.validationState.status) {
      case validationStatuses.valid:
        inputClasses.push("is-valid");
        messageClasses.push("valid-feedback");
        break;
      case validationStatuses.invalid:
        inputClasses.push("is-invalid");
        messageClasses.push("invalid-feedback");
        break;
      default:
        break;
    }

    let inputProps = {
      type: this.props.type,
      placeholder: this.props.placeholder,
      value: this.props.value,
      className: inputClasses.join(" "),
      onChange: this.props.onValueChange
    };

    if (this.props.id) {
      inputProps["id"] = this.props.id;
    }

    let messageProps = {
      className: messageClasses.join(" ")
    };

    return (
      <div>
        <Label className="font-weight-bold">{this.props.label}</Label>

        <input {...inputProps} />

        {this.props.validationState.message && (
          <span {...messageProps}>{this.props.validationState.message}</span>
        )}
        {this.props.validationState.status === validationStatuses.default && (
          <small className="form-text text-muted">{this.props.help}</small>
        )}
      </div>
    );
  }
}
