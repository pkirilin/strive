import React from "react";
import PropTypes from "prop-types";

export class PageTitle extends React.Component {
  static propTypes = {
    centered: PropTypes.bool
  };

  static defaultProps = {
    centered: true
  };

  render() {
    let classNames = ["mt-3"];
    if (this.props.centered && this.props.centered === true) {
      classNames.push("text-center");
    }
    return <h1 className={classNames.join(" ")}>{this.props.children}</h1>;
  }
}
