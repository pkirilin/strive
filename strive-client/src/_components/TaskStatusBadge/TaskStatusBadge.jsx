import React from "react";
import PropTypes from "prop-types";
import { Badge } from "reactstrap";

const TaskStatusBadge = props => {
  function getColorByStatus(status) {
    switch (status) {
      case "Planned":
        return "danger";
      case "In process":
        return "primary";
      case "Completed":
        return "success";
      default:
        return "secondary";
    }
  }

  const color = getColorByStatus(props.children);
  return <Badge color={color}>{props.children}</Badge>;
};

TaskStatusBadge.propTypes = {
  children: PropTypes.string.isRequired
};

export default TaskStatusBadge;
