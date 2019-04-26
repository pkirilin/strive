import React from "react";
import { ListGroupItem, Row, Col, Fade, Button } from "reactstrap";

export class ProjectListItem extends React.Component {
  constructor(props) {
    super(props);
    this.resources = this.props.resources;

    this.state = {
      showButtons: false
    };

    this.showProjectButtons = this.showProjectButtons.bind(this);
    this.hideProjectButtons = this.hideProjectButtons.bind(this);
  }

  showProjectButtons() {
    this.setState({
      showButtons: true
    });
  }

  hideProjectButtons() {
    this.setState({
      showButtons: false
    });
  }

  render() {
    let { buttons } = this.resources.projects.overview;
    return (
      <ListGroupItem
        tag="a"
        href="#"
        action
        onMouseEnter={this.showProjectButtons}
        onMouseLeave={this.hideProjectButtons}
      >
        <Row className="d-flex align-items-center">
          <Col sm="8">{this.props.data.name}</Col>
          <div className="d-flex flex-fill justify-content-end">
            <Col xs="auto">
              <Fade in={this.state.showButtons}>
                <Row>
                  <Col className="d-flex justify-content-center pt-2 pb-2">
                    <Button className="col-12">{buttons.editProject}</Button>
                  </Col>
                  <Col className="d-flex justify-content-center pt-2 pb-2">
                    <Button className="col-12">{buttons.deleteProject}</Button>
                  </Col>
                </Row>
              </Fade>
            </Col>
          </div>
        </Row>
      </ListGroupItem>
    );
  }
}
