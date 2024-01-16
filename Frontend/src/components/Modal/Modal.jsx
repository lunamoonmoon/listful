import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import "./Modal.scss";

export default function Modal({ title, body, closeModal, buttons }) {
  return (
    <BootstrapModal show={true} onHide={closeModal}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <div>{body}</div>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        {buttons ? buttons : null}
        <Button variant="primary" className='close' onClick={closeModal} >
          Close
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}
