import React, { useState, useReducer, useEffect } from "react";
import Modal from "../Modal/Modal";
import Home from "../Home/Home";
import About from "../About/About";
import SignUpLogIn from "../SignUpLogIn/SignUpLogIn";
import Searchbar from "../Searchbar/Searchbar";
import "./NavBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { loginReducer, loginState } from "../../hooks/loginReducer";
// import { useHistory } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function NavBar({
  isLoggedIn,
  user,
  openModal,
  setIsSignUp,
  handleSearch,
  handleLogout,
  handleCatalogue,
  clearBooks,
  setShowUserComponent,
}) {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userState, loginDispatch] = useReducer(loginReducer, loginState);


  const handleCatalogueClick = (e) => {
    e.preventDefault();
    handleCatalogue();
  };

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

  // const navigate = useNavigate(); 

  const handleLogoutClick = () => {
    loginDispatch({ type: 'SET_LOGOUT', payload: 1 });
    console.log("handleLogout triggered")
    console.log("userState", userState)
    // navigate.push("/"); // Redirect to the home page
    
  };

  useEffect(() => {
    console.log("login State", userState);
  }, [userState.loginState]);

  //logout function 

    //const { isLoggedIn } = loginState;
   
    //for testing

  
  
      // // Implement authentication logic here with the routes we created - once signed up, render the catalogue page component
      // if (isSignUp) {
      //   console.log('Sign-up submitted');
      // } else {
      //   console.log('Login submitted');
      // }
    
      // // Toggle the value of isSignUp
      // setIsSignUp(!isSignUp);
    

  return (
    <nav className="navbar-container">
      <div className="logo">
        <img
          className="listful-nav-logo"
          src={process.env.PUBLIC_URL + "/listful_logo.png"}
          alt="Listful Logo"
          onClick={clearBooks}
        />
      </div>
      <div className="nav-icons">
        {isLoggedIn ? (
          <div className="user-info">
            <button onClick={() => setShowUserComponent(true)}>
              My Account
            </button>
            <button onClick={handleLogoutClick}>Logout</button>
            <button onClick={handleCatalogueClick}>Catalog</button>
            <Searchbar handleSearch={handleSearch} className="searchbar" />
            <button onClick={handleAboutUsClick}>About Us</button>
          </div>
        ) : (
          <React.Fragment>
            <button
              disabled
              onClick={() => alert("Please log in to see our collection")}
            >
              Catalog
            </button>
            <button
              disabled
              onClick={() => alert("Please log in to search our collection")}
            >
              <Searchbar handleSearch={handleSearch} className="searchbar" />
            </button>
            <button onClick={handleAboutUsClick}>About Us</button>
            <button onClick={handleSignUpLogInClick}>
              <FontAwesomeIcon icon={faUser} />
              Sign Up/Log In
            </button>
          </React.Fragment>
        )}
      </div>
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          title={modalContent.type.name}
          body={modalContent}
        />
      )}
    </nav>
  );
}
