import React from "react";

export class SectionTitle extends React.Component {
  static defaultProps = {};

  render() {
    let classNames = [];
    return <h2 className={classNames.join(" ")}>{this.props.children}</h2>;
  }
}
