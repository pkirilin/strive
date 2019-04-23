import React from "react";

export class CheckBox extends React.Component {
  static defaultProps = {
    checked: false
  };

  render() {
    return (
      <div className="form-group form-check">
        <input {...this.props} type="checkbox" className="form-check-input" />

        {this.props.label && (
          <label htmlFor={this.props.id} className="form-check-label">
            {this.props.label}
          </label>
        )}
      </div>
    );
  }
}
