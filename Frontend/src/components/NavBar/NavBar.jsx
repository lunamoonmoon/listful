import React, { useState } from "react";
import Modal from "../Modal/Modal";
import About from "../About/About";

export default function NavBar({ isLoggedIn }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = React.useState(null);
  const [modalType, setModalType] = React.useState(null);

  const handleAboutUsClick = () => {
    setIsModalOpen(true);
  };

  const handleSignUpLogInClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setModalType(null);
    setIsModalOpen(false);
  };
//for the modal, we need to pass in the modal content and the modal type - conditional rendering 
  // React.useEffect(() => {
  //   // Update modalContent based on the modalType
  //   if (modalType === "About") {
  //     setModalContent(<About />);
  //   } else if (modalType === "signUp") {
  //     setModalContent(<SignUpLoginPage />);
  //   }
  // }, [modalType]);

  return (
    <nav>
      <div className="logo">Logo</div>
      <div className="buttons">
        {isLoggedIn ? (
          <>
            <button>Catalog</button>
            <button>Search</button>
          </>
        ) : (
          <>
            <button disabled onClick={() => alert('Please log in to see our collection')}>
              Catalog
            </button>
            <button disabled onClick={() => alert('Please log in to search our collection')}>
              Search
            </button>
          </>
        )}
        <button onClick={handleAboutUsClick}>About Us</button>
        {isModalOpen && <Modal closeModal={closeModal}><About /></Modal>}

        <button onClick={handleSignUpLogInClick}>Sign Up/Log In</button>
      </div>
    </nav>
  );
}
