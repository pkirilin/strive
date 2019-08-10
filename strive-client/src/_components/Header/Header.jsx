import React from "react";
import PropTypes from "prop-types";

const Header = props => {
  let HeaderTag = `h${props.level}`;
  let headerClassNames = [];

  if (props.centered === true) {
    headerClassNames.push("text-center");
  }

  return (
    <HeaderTag className={headerClassNames.join(" ")}>
      {props.children}
    </HeaderTag>
  );
};

Header.propTypes = {
  centered: PropTypes.bool,
  level: PropTypes.oneOf(["1", "2", "3", "4", "5", "6"]),
  children: PropTypes.any.isRequired
};

Header.defaultProps = {
  centered: true,
  level: "1"
};

export default Header;
