import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

export default function Modal({ title, body, closeModal, onAddToUserBooks }) {
  return (
    <BootstrapModal show={true} onHide={closeModal}>
      <BootstrapModal.Header closeButton>
        {/* <BootstrapModal.Title>{title}</BootstrapModal.Title> */}
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <div>{body}</div>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        {onAddToUserBooks && (
          <Button variant="primary" onClick={onAddToUserBooks}>
            Add to My Books
          </Button>
        )}
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}
