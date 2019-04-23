import React from "react";

export class Loading extends React.Component {
  static defaultProps = {
    text: "Loading..."
  };

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-muted" />
        <span className="p-2 bg-transparent text-muted">{this.props.text}</span>
      </div>
    );
  }
}
