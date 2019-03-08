import React from "react";
import { Label, Input } from "reactstrap";

export class LabeledInput extends React.Component {
  render() {
    return (
      <div>
        <Label className="font-weight-bold">{this.props.label}</Label>
        <Input
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onValueChange}
        />
      </div>
    );
  }
}
