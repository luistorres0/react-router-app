import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"

import "./ErrorModal.css";

const ErrorModal = (props) => {
  return (
    <Modal centered show={props.showModal} onHide={props.hideModal}>
      <Modal.Header><h5>Oops! Something went wrong.</h5></Modal.Header>
      <Modal.Body>{props.errorMessage}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.hideModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
