import React, { useState } from "react";
import Modal from "../Modal/Modal";
import About from "../About/About";
import Searchbar from "../Searchbar/Searchbar";
import "./NavBar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function NavBar({ isLoggedIn, handleSearch }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [modalContent, setModalContent] = React.useState(null);
  // const [modalType, setModalType] = React.useState(null);
  
  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // setModalContent(null);
    // setModalType(null);
    setIsModalOpen(false);
  };

  const onSearch = () =>{

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
        <img className="listful-nav-logo" src={process.env.PUBLIC_URL + "/listful_logo_graphic.png"}/>
      </div>
      <div className="nav-icons">
        <Searchbar handleSearch={handleSearch}/>
        <button disabled onClick={() => alert('Please log in to see our collection')}>Catalog</button>
        <button onClick={handleClick}>About Us</button>
        {isModalOpen && <Modal closeModal={closeModal}><About /></Modal>}
        <button onClick={handleClick}> <FontAwesomeIcon icon={faUser} /> Sign Up/Log In</button>
      </div>
    </nav>
  );
}
