import React from "react";
import PropTypes from "prop-types";
import { config } from "../../_helpers";

export class DocumentTitleSetter extends React.Component {
  static propTypes = {
    displayBrand: PropTypes.bool,
    brand: PropTypes.string,
    values: PropTypes.array
  };

  static defaultProps = {
    displayBrand: true,
    brand: config.brandName,
    values: []
  };

  componentDidMount() {
    let { displayBrand, brand, values } = this.props;
    let title = "";

    if (displayBrand === true && brand) {
      title = brand;
    }

    if (values && values.length > 0) {
      if (title !== "") {
        title += " - ";
      }
      title += `${values.join(" - ")}`;
    }

    document.title = title;
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
