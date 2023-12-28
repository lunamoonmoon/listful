import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import AboutPage from './components/About/About';
import Home from './components/Home/Home'
import BookModal from './components/Modal/Modal';
import { useState } from 'react';

function App() {
  let [modal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return (
    <div className="App">
      <NavBar/>
      <Home/>
      { modal && <BookModal title="title" body="" /> }
      <AboutPage/>
      <Footer/>
    </div>
  );
}

export default App;
