import React from "react";
import PropTypes from "prop-types";

export const AppSectionSeparator = props => {
  return <div className={`mt-${props.separatorValue}`}>{props.children}</div>;
};

AppSectionSeparator.propTypes = {
  children: PropTypes.node.isRequired,
  separatorValue: PropTypes.oneOf(["0", "1", "2", "3", "4", "5", "auto"])
    .isRequired
};

AppSectionSeparator.defaultProps = {
  separatorValue: "4"
};
