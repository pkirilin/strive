import React from "react";
import { Label, Input } from "reactstrap";

export class TextArea extends React.Component {
  static defaultProps = {
    type: "textarea",
    rows: 4
  };

  render() {
    return (
      <div>
        {this.props.label && (
          <Label className="font-weight-bold">{this.props.label}</Label>
        )}

        <Input {...this.props} />

        {this.props.help && (
          <small className="form-text text-muted">{this.props.help}</small>
        )}
      </div>
    );
  }
}
