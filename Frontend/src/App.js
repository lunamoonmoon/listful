import React, { useState, useReducer } from 'react';
import { initialState, searchReducer } from './hooks/searchReducer';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home'
import Modal from './components/Modal/Modal';
import Book from './components/Book/Book';


function App() {
  const [modalContent, setModalContent] = useState(null);
  const [isSignUp, setIsSignUp] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [state, dispatch] = useReducer(searchReducer, initialState);
  const { searchResults } = state;

  //lets user search term go to backend and fetch from api
  async function handleSearch() {
    const searchInput = document.getElementById('searchValue').value;
    try {
      const res = await fetch(`http://localhost:8001/search?searchTerm=${searchInput}`, {
      method: 'GET',
    })
    if(!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data = await res.json();
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: data });
    } catch(err) {
      console.error(`Error fetching books: ${err}`)
    }
  }

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
      < Book bookResults={searchResults} />
      <Home openModal={openModal} searchResults={searchResults} />
      {isModalOpen && modalContent && (
        <Modal closeModal={closeModal} title={modalContent.type.name} body={modalContent} />
      )}
    </div>
  );
}

export default App;
