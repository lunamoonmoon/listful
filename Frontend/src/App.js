import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home'
import BookModal from './components/Modal/Modal';
import { useState, useReducer } from 'react';
import { initialState, searchReducer } from './hooks/searchReducer';
import axios from 'axios';


function App() {
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

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} handleSearch={handleSearch}/>
      <Home searchResults={searchResults}/>
      { modal && <BookModal title="title" body="" /> }
      <Footer/>
    </div>
  );
}

export default App;
