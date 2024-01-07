import React, { useState } from "react";
import Modal from "../BookModal/BookModal";
import About from "../About/About";
import SignUpLogIn from "../SignUpLogIn/SignUpLogIn";
import Searchbar from "../Searchbar/Searchbar";
import "./NavBar.scss"; 

export default function NavBar({ isLoggedIn, openModal, setIsSignUp }) {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAboutUsClick = () => {
    setModalContent(<About />);
    openModal(<About />);
  };

  const handleSignUpLogInClick = () => {
    setModalContent(<SignUpLogIn setIsSignUp={setIsSignUp} />);
    openModal(<SignUpLogIn setIsSignUp={setIsSignUp} />);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  return (
    <nav>
      <div className="logo">
        <img className="listful-logo" src={process.env.PUBLIC_URL + "/listful_logo.png"} alt="Listful Logo" />
      </div>
      <div className="buttons">
        {isLoggedIn ? (
          <>
            <button>Catalog</button>
            <Searchbar />
          </>
        ) : (
          <>
            <button disabled onClick={() => alert('Please log in to see our collection')}>
              Catalog
            </button>
            <button disabled onClick={() => alert('Please log in to search our collection')}>
              <Searchbar />
            </button>
          </>
        )}
        <button onClick={handleAboutUsClick}>About Us</button>
        <button onClick={handleSignUpLogInClick}>Sign Up/Log In</button>
      </div>
      {isModalOpen && (
        <Modal closeModal={closeModal} title={modalContent.type.name} body={modalContent} />
      )}
    </nav>
  );
}
