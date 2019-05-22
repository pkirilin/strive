import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroupItem } from "reactstrap";
import { AppCheckBox } from "../../_components";
import { tasksActions } from "../../_actions";

class TaskListItem extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired
    })
  };

  constructor(props) {
    super(props);

    this.onSelectTask = this.onSelectTask.bind(this);
  }

  onSelectTask() {
    let { id: targetTaskId } = this.props.data;
    this.props.dispatch(tasksActions.checkTarget(targetTaskId));
  }

  // shouldComponentUpdate(nextProps) {
  //   if (this.props.data !== nextProps.data) {
  //     return true;
  //   }
  //   return false;
  // }

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

const connectedTaskListItem = connect()(TaskListItem);
export { connectedTaskListItem as TaskListItem };
