import React, { useState } from "react";
import Modal from "../Modal/Modal";
import About from "../About/About";
import SignUpLogIn from "../SignUpLogIn/SignUpLogIn";
import Searchbar from "../Searchbar/Searchbar";
import Catalogue from "../Catalogue/Catalogue";
import "./NavBar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function NavBar({ isLoggedIn, user, openModal, setIsSignUp, handleSearch, handleLogout }) {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [bookResults, setBookResults] = useState();

  //lets catalogue go to backend and fetch from api
  async function handleCatalogue() {
    const searchInput = document.getElementById('searchValue').value;
    try {
      const res = await fetch(`http://localhost:8001/search?searchTerm=${searchInput}`, {
      method: 'GET',
    })
    if(!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data = await res.json();
    setBookResults(data);
    } catch(err) {
      console.error(`Error fetching books: ${err}`)
    }
  }

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
      {isLoggedIn ? (
        // confirm here that user is logged in when the back end is connected, that the users name is displayed, and that the login/signup button has disappeared when logged in
        <div className="user-info">
          <span>Hi, {user.username}</span>
          <button onClick={handleLogout}>Logout</button>
          <button>Catalog</button>
          <Searchbar handleSearch={handleSearch} className='searchbar' />
        </div>
      ) : (
        <div className="nav-icons">
          <button disabled onClick={() => alert('Please log in to see our collection')}>
            Catalog
          </button>
          <button disabled onClick={() => alert('Please log in to search our collection')}>
            <Searchbar />
          </button>
          <button onClick={handleAboutUsClick}>About Us</button>
          <button onClick={handleSignUpLogInClick}>
            <FontAwesomeIcon icon={faUser} /> Sign Up/Log In
          </button>
        </div>
      )}
      {isModalOpen && (
        <Modal closeModal={closeModal} title={modalContent.type.name} body={modalContent} />
      )}
    </nav>
  );
}
