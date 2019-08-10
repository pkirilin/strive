import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { Header } from "../../../_components";
import { historyHelper } from "../../../_helpers";

export default class ProjectsOverviewHeadline extends Component {
  constructor(props) {
    super(props);
    this.createProject = this.createProject.bind(this);
  }

  createProject() {
    historyHelper.redirectToCreateProject();
  }

  render() {
    return (
      <Row className="d-flex justify-content-between align-items-center">
        <Col xs="auto">
          <Header level="2" centered={false}>
            Project list
          </Header>
        </Col>
        <Col xs="auto">
          <Button color="light border" onClick={this.createProject}>
            Create project
          </Button>
        </Col>
      </Row>
    );
  }
}
