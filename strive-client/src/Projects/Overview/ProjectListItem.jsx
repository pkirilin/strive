import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ListGroupItem, Row, Col, Fade, Button } from "reactstrap";
import { modalActions, projectsActions, alertActions } from "../../_actions";
import { modalConstants } from "../../_constants";
import { AppHeader } from "../../_components";
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
    return (
      <ListGroupItem
        action
        onMouseEnter={this.showProjectButtons}
        onMouseLeave={this.hideProjectButtons}
      >
        <Row className="d-flex align-items-center">
          <Col sm="8">
            <Link
              className="text-body text-decoration-none"
              to={`/projects/info/${this.props.data.id}`}
            >
              <AppHeader level="4" centered={false}>
                {this.props.data.name}
              </AppHeader>
            </Link>
          </Col>
          <div className="d-flex flex-fill justify-content-end">
            <Col xs="auto">
              <Fade in={this.state.showButtons}>
                <Row>
                  <Col className="d-flex justify-content-center pt-2 pb-2">
                    <Button
                      color="light border"
                      className="col-12"
                      onClick={this.onEdit}
                    >
                      Edit
                    </Button>
                  </Col>
                  <Col className="d-flex justify-content-center pt-2 pb-2">
                    <Button
                      color="light border"
                      className="col-12"
                      onClick={this.onDelete}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Fade>
            </Col>
          </div>
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

const connectedProjectListItem = connect()(ProjectListItem);
export { connectedProjectListItem as ProjectListItem };
