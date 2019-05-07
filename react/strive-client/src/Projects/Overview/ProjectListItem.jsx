import React from "react";
import { Link } from "react-router-dom";
import { ListGroupItem, Row, Col, Fade, Button } from "reactstrap";
import { history } from "../../_helpers";

export class ProjectListItem extends React.Component {
  constructor(props) {
    super(props);
    this.resources = this.props.resources;

    this.state = {
      showButtons: false
    };

    this.showProjectButtons = this.showProjectButtons.bind(this);
    this.hideProjectButtons = this.hideProjectButtons.bind(this);
    this.onEdit = this.onEdit.bind(this);
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

  onEdit() {
    history.push(`/projects/edit/${this.props.data.id}`);
  }

  render() {
    let { buttons } = this.resources.projects.overview;
    return (
      <ListGroupItem
        action
        onMouseEnter={this.showProjectButtons}
        onMouseLeave={this.hideProjectButtons}
      >
        <Row className="d-flex align-items-center">
          <Col sm="8">
            <Link to="/">{this.props.data.name}</Link>
          </Col>
          <div className="d-flex flex-fill justify-content-end">
            <Col xs="auto">
              <Fade in={this.state.showButtons}>
                <Row>
                  <Col className="d-flex justify-content-center pt-2 pb-2">
                    <Button className="col-12" onClick={this.onEdit}>
                      {buttons.editProject}
                    </Button>
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
