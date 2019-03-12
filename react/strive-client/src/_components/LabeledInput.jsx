import React from "react";
import { Label } from "reactstrap";
import { validationStates } from "../_constants/validation";

export class LabeledInput extends React.Component {
  static defaultProps = {
    validationState: {
      status: validationStates.default
    }
  };

  render() {
    let inputClasses = [
      this.props.readonly ? "form-control-plaintext" : "form-control"
    ];

    let messageClasses = [];

    switch (this.props.validationState.status) {
      case validationStates.valid:
        inputClasses.push("is-valid");
        messageClasses.push("valid-feedback");
        break;
      case validationStates.invalid:
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

    let messageProps = {
      className: messageClasses.join(" ")
    };

    return (
      <div>
        <Label className="font-weight-bold">{this.props.label}</Label>

        <input {...inputProps} />

        {this.props.help && (
          <small className="form-text text-muted">{this.props.help}</small>
        )}
        {this.props.validationState.message && (
          <span {...messageProps}>{this.props.validationState.message}</span>
        )}
      </div>
    );
  }
}
