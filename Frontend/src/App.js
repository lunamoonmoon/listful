import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Modal from './components/Modal/Modal';
import SignUpLogIn from './components/SignUpLogIn/SignUpLogIn';

function App() {
  const [modalContent, setModalContent] = useState(null);
  const [isSignUp, setIsSignUp] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <NavBar isLoggedIn={false} openModal={openModal} />
      {modalContent && isSignUp && (
        <SignUpLogIn closeModal={closeModal} setIsSignUp={setIsSignUp} />
      )}
      {modalContent && !isSignUp && (
        <SignUpLogIn closeModal={closeModal} setIsSignUp={setIsSignUp} />
      )}
      <Home openModal={openModal} />
      {isModalOpen && modalContent && (
        <Modal closeModal={closeModal} title={modalContent.type.name} body={modalContent} />
      )}
      <Footer />
    </div>
  );
}

export default App;
