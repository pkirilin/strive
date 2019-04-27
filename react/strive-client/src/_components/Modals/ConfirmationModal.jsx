import React from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { modalTypes } from "../../_constants";
import { modalActions } from "../../_actions/modal.actions";

const mapStateToProps = state => {
  let { modalReducer } = state;
  return {
    modalReducer
  };
};

class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);

    this.close = this.close.bind(this);
  }

  close() {
    this.props.dispatch(modalActions.close());
  }

  render() {
    let { title, message } = this.props;
    let { isOpen, modalType } = this.props.modalReducer;
    return (
      <div>
        {isOpen && modalType && modalType === modalTypes.CONFIRMATION && (
          <div>
            <Modal isOpen={isOpen} className={this.props.className}>
              <ModalHeader toggle={this.close}>{title}</ModalHeader>
              <ModalBody>{message}</ModalBody>
              <ModalFooter>
                <Button className="col-3" onClick={this.close}>
                  Yes
                </Button>
                <Button className="col-3" onClick={this.close}>
                  No
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

const connectedConfirmationModal = connect(mapStateToProps)(ConfirmationModal);
export { connectedConfirmationModal as ConfirmationModal };
