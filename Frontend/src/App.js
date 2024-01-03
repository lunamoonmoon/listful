import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home'
import BookModal from './components/Modal/Modal';
import { useState } from 'react';

function App() {
  let [modal, setModal] = useState(false);
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn}/>
      <Home/>
      { modal && <BookModal title="title" body="" /> }
      <Footer/>
    </div>
  );
}

export default App;
