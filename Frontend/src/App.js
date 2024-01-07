import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home'
import { useState, useReducer } from 'react';
import { modalState, modalReducer } from './hooks/modalReducer'
import { initialState, searchReducer } from './hooks/searchReducer';
import axios from 'axios';


function App() {
  const [showState, showDispatch] = useReducer(modalReducer, modalState);
  const { show } = showState;
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const { searchResults } = state;

  const handleModal = () => {
    if (show === false) {
      dispatch({ type: 'HANDLE_OPEN' })
    } else {
      dispatch({ type: 'HANDLE_CLOSE' })
    };
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: response.data });
    } catch (error) {
      console.error(`Error searching for books: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} handleSearch={handleSearch} handleModal={handleModal} show={show}/>
      <Home searchResults={searchResults} show={show}/>
      <Footer/>
    </div>
  );
}

export default App;
