import React, { useState } from "react";
import BookModal from "../BookModal/BookModal";
import About from "../About/About";
import Searchbar from "../Searchbar/Searchbar";
import { modalState, modalReducer } from "../../hooks/modalReducer";
import "./NavBar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function NavBar({ isLoggedIn, handleSearch, handleModal, show }) {
  const handleAbout = () => {
    <About/>;
    handleModal();
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
    <nav className="navbar-container">
      <div className="logo">
      <img className="listful-nav-logo" src={process.env.PUBLIC_URL + "/listful_logo.png"}></img>
      </div>
      <div className="nav-icons">
        <Searchbar handleSearch={handleSearch} className='searchbar'/>
        <button disabled onClick={() => alert('Please log in to see our collection')}>Catalog</button>
        <button onClick={handleAbout}>About Us</button>
        <button onClick={handleModal}> <FontAwesomeIcon icon={faUser} /> Sign Up/Log In</button>
      </div>
    </nav>
  );
}
