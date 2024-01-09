import React, { useState } from "react";
import Modal from "../Modal/Modal";
import About from "../About/About";
import SignUpLogIn from "../SignUpLogIn/SignUpLogIn";
import Searchbar from "../Searchbar/Searchbar";
import Catalogue from "../Catalogue/Catalogue";
import "./NavBar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function NavBar({ isLoggedIn, openModal, setIsSignUp, handleSearch }) {
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

  const handleCatalogueClick = () => {
    setModalContent(<Catalogue />);
    openModal(<Catalogue />);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  return (
    <nav className="navbar-container">
      <div className="logo">
        <img className="listful-nav-logo" src={process.env.PUBLIC_URL + "/listful_logo.png"} alt="Listful Logo" />
      </div>
      <div className="nav-icons">
        {isLoggedIn ? (
          <>
            <button onClick={handleCatalogueClick}>Catalog</button>
            <Searchbar handleSearch={handleSearch} className='searchbar' />
          </>
        ) : (
          <>
            <button disabled onClick={() => alert('Please log in to see our collection')}>
              Catalog
            </button>
            <button disabled onClick={() => alert('Please log in to search our collection')}>
              <Searchbar handleSearch={handleSearch} className='searchbar'/>
            </button>
          </>
        )}
        <button onClick={handleAboutUsClick}>About Us</button>
        <button onClick={handleSignUpLogInClick}> <FontAwesomeIcon icon={faUser} /> Sign Up/Log In</button>
      </div>
      {isModalOpen && (
        <Modal closeModal={closeModal} title={modalContent.type.name} body={modalContent} />
      )}
    </nav>
  );
}
