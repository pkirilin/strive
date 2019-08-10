import React from "react";
import PropTypes from "prop-types";

const SectionSeparator = props => {
  return <div className={`mt-${props.separatorValue}`}>{props.children}</div>;
};

SectionSeparator.propTypes = {
  children: PropTypes.node.isRequired,
  separatorValue: PropTypes.oneOf(["0", "1", "2", "3", "4", "5", "auto"])
    .isRequired
};

SectionSeparator.defaultProps = {
  separatorValue: "4"
};

export default SectionSeparator;
