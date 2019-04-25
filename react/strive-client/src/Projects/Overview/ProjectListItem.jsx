import React from "react";
import { ListGroupItem, Row, Col, Fade, Button } from "reactstrap";

export class ProjectListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false
    };

    this.toggleProjectButtons = this.toggleProjectButtons.bind(this);
  }

  toggleProjectButtons() {
    this.setState({
      showButtons: !this.state.showButtons
    });
  }

  render() {
    return (
      <ListGroupItem
        tag="a"
        href="#"
        action
        onMouseEnter={this.toggleProjectButtons}
        onMouseLeave={this.toggleProjectButtons}
      >
        <Row className="d-flex align-items-center">
          <Col sm="8">{this.props.data.name}</Col>
          <div className="d-flex flex-fill justify-content-end">
            <Col xs="auto">
              <Fade in={this.state.showButtons}>
                <Row>
                  <Col className="d-flex justify-content-center pt-2 pb-2">
                    <Button className="col-12">Edit</Button>
                  </Col>
                  <Col className="d-flex justify-content-center pt-2 pb-2">
                    <Button className="col-12">Delete</Button>
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
