import React from "react";
import PropTypes from "prop-types";

export const AppHeader = props => {
  let HeaderTag = `h${props.level}`;
  let headerClassNames = ["mt-3"];

  if (props.centered === true) {
    headerClassNames.push("text-center");
  }

  return (
    <HeaderTag className={headerClassNames.join(" ")}>
      {props.children}
    </HeaderTag>
  );
};

AppHeader.propTypes = {
  centered: PropTypes.bool,
  level: PropTypes.oneOf(["1", "2"]),
  children: PropTypes.element.isRequired
};

AppHeader.defaultProps = {
  centered: true,
  level: "1"
};
