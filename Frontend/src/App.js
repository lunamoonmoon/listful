import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import AboutPage from './components/About/About';
import Home from './components/Home/Home'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Home/>
    </div>
  );
}

export default App;
