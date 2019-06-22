import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ListGroupItem, Row, Col } from "reactstrap";
import { AppSectionSeparator } from "../../_components";

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
      <AppSectionSeparator separatorValue="2">
        <ListGroupItem action>
          <Row>
            <Col xs="auto">
              <Link
                className="text-body"
                to={`/projects/info/${this.props.data.id}`}
              >
                {this.props.data.name}
              </Link>
            </Col>
          </Row>
          <Row>
            <Col className="font-weight-light">
              {this.props.data.description}
            </Col>
          </Row>
        </ListGroupItem>
      </AppSectionSeparator>
    );
  }
}
