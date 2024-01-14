import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

export default function Modal({ title, body, closeModal }) {
  return (
    <BootstrapModal show={true} onHide={closeModal}>
      <BootstrapModal.Header closeButton>
        {/* <BootstrapModal.Title>{title}</BootstrapModal.Title> */}
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <div>{body}</div>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="primary" onClick={closeModal}>
          Close
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}
