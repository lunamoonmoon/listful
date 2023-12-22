//import Modal from "../LoginModal/Modal";
//import logo! 
import React, {useState} from "react";
import Modal from "../Modal/Modal";
import About from "../About/About";


export default function NavBar( {isLoggedIn} ) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleAboutUsClick = () => {
    setModalContent(<About />);
    setIsModalOpen(true);
  };

  const handleSignUpLogInClick = () => {
    //setModalContent(<SignUpLogIn />);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

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
        {isModalOpen && <About closeModal={closeModal} />}

        <button onClick={() => handleSignUpLogInClick()}>Sign Up/Log In</button>
        {/* {isModalOpen && <SignUpLogIn closeModal={closeModal} />} */}
      </div>
    </nav>
  );
};