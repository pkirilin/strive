import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export class ConfirmationModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func
  };

  render() {
    let { isOpen, title, message, onClose, onConfirm } = this.props;
    return (
      <Modal isOpen={isOpen}>
        <ModalHeader toggle={onClose}>{title}</ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button className="col-3" onClick={onConfirm}>
            Yes
          </Button>
          <Button className="col-3" onClick={onClose}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
