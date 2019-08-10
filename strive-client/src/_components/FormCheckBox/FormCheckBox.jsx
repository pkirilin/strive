import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FormCheckBox extends Component {
  static propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  };

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
