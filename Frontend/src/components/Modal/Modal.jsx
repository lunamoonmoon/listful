function Modal({ children, closeModal }) {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(event) => event.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;


//views to render in modal instead of several modals - views and ejs files in Tinyapp but react does not use this. Read documentation for more
//conditional rendering  - use state to monitor it
//use state to monitor if modal is open or closed
// when user clicks button, retrieve what the user clicked, and change the state to what thye clikcked on and contidional render to whatever you want in the modal 
