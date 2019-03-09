import React from "react";
import { Label, Input } from "reactstrap";

export class LabeledInput extends React.Component {
  render() {
    return (
      <div>
        <Label className="font-weight-bold">{this.props.label}</Label>

        {!this.props.readonly && (
          <Input
            type={this.props.type}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.props.onValueChange}
          />
        )}

        {this.props.readonly && (
          <input
            type={this.props.type}
            placeholder={this.props.placeholder}
            value={this.props.value}
            readOnly
            className="form-control-plaintext"
          />
        )}

        {this.props.help && (
          <small className="form-text text-muted">{this.props.help}</small>
        )}
      </div>
    );
  }
}
