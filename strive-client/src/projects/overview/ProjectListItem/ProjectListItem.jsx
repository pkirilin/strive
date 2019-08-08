import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ListGroupItem, Row, Col } from "reactstrap";
import { AppSectionSeparator } from "../../../_components";

export default class ProjectListItem extends Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }).isRequired
  };

  render() {
    const { id, name, description } = this.props.data;
    return (
      <AppSectionSeparator separatorValue="2">
        <ListGroupItem action>
          <Row>
            <Col xs="auto">
              <Link className="text-body" to={`/projects/info/${id}`}>
                {name}
              </Link>
            </Col>
          </Row>
          <Row>
            <Col className="font-weight-light">{description}</Col>
          </Row>
        </ListGroupItem>
      </AppSectionSeparator>
    );
  }
}
