import React, { useState, useReducer } from 'react';
import { initialState, searchReducer } from './hooks/searchReducer';
import axios from 'axios';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home'
import BookModal from './components/Modal/Modal';
import Modal from './components/Modal/Modal';
import SignUpLogIn from './components/SignUpLogIn/SignUpLogIn';


function App() {
  const [modalContent, setModalContent] = useState(null);
  const [isSignUp, setIsSignUp] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let [modal, setModal] = useState(false);
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const { searchResults } = state;

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: response.data });
    } catch (error) {
      console.error(`Error searching for books: ${error.message}`);
    }
  };

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
      <NavBar isLoggedIn={false} openModal={openModal} handleSearch={handleSearch}/> //alt-> isLoggedIn={isLoggedIn}
      {modalContent && isSignUp && (
        <SignUpLogIn closeModal={closeModal} setIsSignUp={setIsSignUp} />
      )}
      {modalContent && !isSignUp && (
        <SignUpLogIn closeModal={closeModal} setIsSignUp={setIsSignUp} />
      )}
      <Home openModal={openModal} searchResults={searchResults} />
      {isModalOpen && modalContent && (
        <Modal closeModal={closeModal} title={modalContent.type.name} body={modalContent} />
      )} 
      //<Home searchResults={searchResults}/>
     //{ modal && <BookModal title="title" body="" /> }
      <Footer />
    </div>
  );
}

export default App;
