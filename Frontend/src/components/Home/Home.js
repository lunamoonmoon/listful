import { useEffect, useState } from 'react';
import axios from 'axios';
import Book from '../Book/Book';

export default function Home() {
  //get libraries from db
  const [libraries, setLibraries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/libraries')
      .then(response => {
        setLibraries(response.data);
      })
      .catch(err => {
        console.error(`Error fetching libraries: ${err}`);
      });
  }, []);

  //map through db libraries displaying its books
  //we only want to map through the libraries IF someone is logged in - need to implement this functionality
  return (
//       <h1>Save all your favourite books in one spot</h1>
//       <p>Organize your books, one list at a time with your Listful Library, a web app that collates your library in one easy location.</p>
//       <button>Sign Up Now</button>
    <div data-testid='Home'>
      <script src="Frontend/public/listful_logo.png"></script>
      {libraries.map((library) => (
        <ul key={library.id}>
          <li>
              <h2>{library.name}</h2>
              <Book libraryId={library.id}/>
          </li>
        </ul>
      ))};
    </div>
  )
};
