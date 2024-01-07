import { useState } from 'react';
import { show, handleModal } from '../../hooks/modalReducer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AboutPage( { show, handleModal} ) {

  return (
    <div data-testid="AboutPage">
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> need to move this to the about button*/}

      <Modal show={show} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>About Us</h1>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>We are the Students of Lighthouse Labs, and this is our final project.
        India, Luna, Jeremy, and Taylor created this project as part of the June 12, 2023 cohort of the Lighthouse Labs Web Development Flex Program.</p>
        <a href="https://github.com/lunamoonmoon/listful" target="_blank">GitHub Repo</a> <br/>
        <a href="https://www.lighthouselabs.ca/" target="_blank">Lighthouse Labs</a>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
