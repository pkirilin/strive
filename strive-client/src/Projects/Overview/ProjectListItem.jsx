import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ListGroupItem, Row, Col } from "reactstrap";
import { AppHeader } from "../../_components";

export class ProjectListItem extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }).isRequired
  };

  render() {
    return (
      <ListGroupItem action>
        <Row>
          <Col xs="auto">
            <Link
              className="text-body text-decoration-none"
              to={`/projects/info/${this.props.data.id}`}
            >
              <AppHeader level="4" centered={false}>
                {this.props.data.name}
              </AppHeader>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-secondary">{this.props.data.description}</div>
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
}
