import React from "react";
import { Label, Input } from "reactstrap";
import { validationStatuses } from "../../_constants";

export class TextArea extends React.Component {
  static defaultProps = {
    type: "textarea",
    rows: 4,
    validationState: {
      status: validationStatuses.default
    }
  };

  render() {
    let inputClasses = ["form-control"];

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

    // inputPropsForRender will contain all props except validationState
    let { validationState, ...inputPropsForRender } = this.props;

    let inputProps = {
      ...inputPropsForRender,
      className: inputClasses.join(" ")
    };

    let messageProps = {
      className: messageClasses.join(" ")
    };

    return (
      <div>
        {this.props.label && (
          <Label className="font-weight-bold">{this.props.label}</Label>
        )}

        <Input {...inputProps} />

        {this.props.validationState.message && (
          <span {...messageProps}>{this.props.validationState.message}</span>
        )}

        {this.props.help &&
          this.props.validationState.status === validationStatuses.default && (
            <small className="form-text text-muted">{this.props.help}</small>
          )}
      </div>
    );
  }
}
