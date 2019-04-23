import React from "react";

export class PageTitle extends React.Component {
  static defaultProps = {
    centered: true
  };

  render() {
    let classNames = ["mt-3"];
    if (this.props.centered && this.props.centered === true) {
      classNames.push("text-center");
    }
    return <h2 className={classNames.join(" ")}>{this.props.children}</h2>;
  }
}
