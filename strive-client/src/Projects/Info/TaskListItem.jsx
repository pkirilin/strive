import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ListGroupItem, Row, Col } from "reactstrap";
import { tasksActions } from "../../_actions";
import { AppCheckBox, AppHeader } from "../../_components";

class TaskListItem extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
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

  render() {
    let { id, name, description, checked } = this.props.data;
    return (
      <div className="mt-2 d-flex align-items-center">
        <AppCheckBox checked={checked} onChange={this.onSelectTask} />
        <ListGroupItem action>
          <Row>
            <Col xs="auto">
              <Link
                className="text-body text-decoration-none"
                to={`/tasks/info/${id}`}
              >
                <AppHeader level="6" centered={false}>
                  {name}
                </AppHeader>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col className="text-secondary">{description}</Col>
          </Row>
        </ListGroupItem>
      </div>
    );
  }
}

const connectedTaskListItem = connect()(TaskListItem);
export { connectedTaskListItem as TaskListItem };
