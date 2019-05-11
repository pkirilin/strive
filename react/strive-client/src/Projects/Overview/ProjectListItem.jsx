import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ListGroupItem, Row, Col, Fade, Button } from "reactstrap";
import { modalActions, projectsActions, alertActions } from "../../_actions";
import { modalConstants } from "../../_constants";
import { actionHelper } from "../../_helpers";

class ProjectListItem extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.resources = this.props.resources;

    this.state = {
      showButtons: false
    };

    this.showProjectButtons = this.showProjectButtons.bind(this);
    this.hideProjectButtons = this.hideProjectButtons.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
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
    actionHelper.redirectToEditProject(this.props.data.id);
  }

  onDelete() {
    this.props.dispatch(alertActions.clear());
    this.props.dispatch(
      modalActions.open(modalConstants.DELETE_PROJECT_OPEN, {
        title: "Delete project confirmation",
        message: (
          <div>
            Delete project <b>{this.props.data.name}</b>?
          </div>
        ),
        onClose: () => {
          closeModal();
        },
        onConfirm: () => {
          closeModal();
          this.props.dispatch(projectsActions.delete(this.props.data.id));
        }
      })
    );

    const closeModal = () => {
      this.props.dispatch(
        modalActions.close(modalConstants.DELETE_PROJECT_CLOSE)
      );
    };
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
                    <Button className="col-12" onClick={this.onDelete}>
                      {buttons.deleteProject}
                    </Button>
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

const connectedProjectListItem = connect()(ProjectListItem);
export { connectedProjectListItem as ProjectListItem };
