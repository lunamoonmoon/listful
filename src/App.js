import logo from './logo.svg';
import './App.css';
import { NavBar, Footer } from './components/NavBar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <body>

      </body>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
