import React, { useState, useReducer } from 'react';
import { initialState, searchReducer } from './hooks/searchReducer';
import axios from 'axios';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home'
import Modal from './components/Modal/Modal';


function App() {
  const [modalContent, setModalContent] = useState(null);
  const [isSignUp, setIsSignUp] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  const [state, dispatch] = useReducer(searchReducer, initialState);
  const { searchResults } = state;

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: response.data.items });
      console.log(response.data.items);
      console.log(searchResults);
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
      <NavBar isLoggedIn={true} openModal={openModal} handleSearch={handleSearch}/>
      <Home openModal={openModal} searchResults={searchResults} />
      {isModalOpen && modalContent && (
        <Modal closeModal={closeModal} title={modalContent.type.name} body={modalContent} />
      )}
    </div>
  );
}

export default App;
