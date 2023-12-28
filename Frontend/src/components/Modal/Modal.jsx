import Button from 'react-bootstrap/button';
import Modal from 'react-bootstrap/modal';

export default function BookModal(props) {
  const { title, body } = props;
  return (
    <>
      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{body}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary">Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  )
}
