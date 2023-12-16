import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import AboutPage from './components/AboutPage/AboutPage';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <AboutPage/>
      <Footer/>
    </div>
  );
}

export default App;
