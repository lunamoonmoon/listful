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
  return (
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
