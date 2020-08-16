import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"

import "./ErrorModal.css";

const ErrorModal = (props) => {
  return (
    <Modal size="sm" centered show={props.error} onHide={props.hideModal}>
      <Modal.Header className={"bg-light"}><h5>Oops!</h5></Modal.Header>
      <Modal.Body>{props.error}</Modal.Body>
      <Modal.Footer className={"bg-light text-white"}>
        <Button variant="outline-primary" onClick={props.hideModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
