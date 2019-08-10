import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Spinner extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {
    text: "Loading"
  };

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center sticky-top p-3">
        <div className="spinner-border text-muted" />
        <span className="p-2 bg-transparent text-muted">{this.props.text}</span>
      </div>
    );
  }
}
