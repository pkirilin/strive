import React from "react";
import PropTypes from "prop-types";
import { ListGroupItem } from "reactstrap";
import { AppCheckBox } from "../../_components";

export class TaskListItem extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired
    })
  };

  constructor(props) {
    super(props);

    this.onSelectTask = this.onSelectTask.bind(this);
  }

  onSelectTask() {}

  render() {
    let { name, checked } = this.props.data;
    return (
      <div className="d-flex align-items-center">
        <AppCheckBox checked={checked} onChange={this.onSelectTask} />
        <ListGroupItem action>{name}</ListGroupItem>
      </div>
    );
  }
}
