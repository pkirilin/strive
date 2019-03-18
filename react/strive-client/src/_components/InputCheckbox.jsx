import React from "react";

export class InputCheckbox extends React.Component {
  static defaultProps = {
    label: "Checkbox",
    checked: false
  };

  render() {
    let inputProps = {
      id: this.props.id,
      checked: this.props.value,
      onChange: this.props.onCheckedChange
    };

    return (
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" {...inputProps} />
        <label htmlFor={this.props.id} className="form-check-label">
          {this.props.label}
        </label>
      </div>
    );
  }
}
