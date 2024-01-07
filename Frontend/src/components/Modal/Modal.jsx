import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function MainModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


//views to render in modal instead of several modals - views and ejs files in Tinyapp but react does not use this. Read documentation for more
//conditional rendering  - use state to monitor it
//use state to monitor if modal is open or closed
// when user clicks button, retrieve what the user clicked, and change the state to what thye clikcked on and contidional render to whatever you want in the modal 


// function Modal({ children, closeModal }) {
//   return (
//     <div className="modal-overlay" onClick={closeModal}>
//       <div className="modal-content" onClick={(event) => event.stopPropagation()}>
//         <button className="close-button" onClick={closeModal}>
//           X
//         </button>
//         {children}
//       </div>
//     </div>
//   );