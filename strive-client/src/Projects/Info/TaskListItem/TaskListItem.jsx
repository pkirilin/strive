import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ListGroupItem, Row, Col } from "reactstrap";
import { AppCheckBox, TaskStatusBadge } from "../../../_components";

export default class TaskListItem extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired
    }).isRequired,
    selectTask: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onSelectTask = this.onSelectTask.bind(this);
  }

  onSelectTask() {
    const { data, selectTask } = this.props;
    selectTask(data.id);
  }

  render() {
    const { id, title, status, checked } = this.props.data;
    return (
      <div className="mt-2 d-flex align-items-center">
        <AppCheckBox checked={checked} onChange={this.onSelectTask} />
        <ListGroupItem action>
          <Row>
            <Col>
              <Link className="text-body" to={`/tasks/info/${id}`}>
                {title}
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <TaskStatusBadge>{status}</TaskStatusBadge>
            </Col>
          </Row>
        </ListGroupItem>
      </div>
    );
  }
}
