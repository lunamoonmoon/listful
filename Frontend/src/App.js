import React, { useState, useReducer } from "react";
import { initialState, searchReducer } from "./hooks/searchReducer";
import { initialBookState, bookReducer } from "./hooks/bookReducer";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Modal from "./components/Modal/Modal";
import User from "./components/User/User";

function App() {
  const [modalContent, setModalContent] = useState(null);
  const [isSignUp, setIsSignUp] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserComponent, setShowUserComponent] = useState(false); //user test

  const [state, dispatch] = useReducer(searchReducer, initialState);
  const { searchResults } = state;

  //lets user search term go to backend and fetch from api
  async function handleSearch() {
    const searchInput = document.getElementById("searchValue").value;
    try {
      const res = await fetch(
        `http://localhost:8001/search?searchTerm=${searchInput}`,
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();
      dispatch({ type: "SET_SEARCH_RESULTS", payload: data });
      setShowUserComponent(false);
    } catch (err) {
      console.error(`Error fetching books: ${err}`);
    }
  }

  const [bookState, bookDispatch] = useReducer(bookReducer, initialBookState);
  const { bookResults } = bookState;

  //lets catalogue go to backend and fetch from api
  async function handleCatalogue() {
    try {
      const res = await fetch(`http://localhost:8001/search/catalogue`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();

      bookDispatch({ type: 'SET_BOOK_RESULTS', payload: data });
      dispatch({ type: 'CLEAR_SEARCH_RESULTS' });
      setShowUserComponent(false);
    } catch(err) {
      console.error(`Error fetching books: ${err}`)
    }
  }

  const clearBooks = () => {
    dispatch({ type: "CLEAR_SEARCH_RESULTS" });
    bookDispatch({ type: "CLEAR_BOOK_RESULTS" });
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
      <NavBar
        isLoggedIn={true}
        openModal={openModal}
        handleSearch={handleSearch}
        handleCatalogue={handleCatalogue}
        clearBooks={clearBooks}
        setShowUserComponent={setShowUserComponent}
      />
     {showUserComponent ? (
        <User openModal={openModal} />
      ) : (
        <Home openModal={openModal} searchResults={searchResults} bookResults={bookResults} />
      )}
      {isModalOpen && modalContent && (
        <Modal closeModal={closeModal} title={modalContent.props.title} buttons={modalContent.props.buttons} body={modalContent} />
      )}
    </div>
  );
};

export default App;
