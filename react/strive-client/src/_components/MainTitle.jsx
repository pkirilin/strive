import React from "react";

export class MainTitle extends React.Component {
  render() {
    return <h2 className="mt-3 text-center">{this.props.text}</h2>;
  }
}
