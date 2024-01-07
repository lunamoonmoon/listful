import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from '../Book/Book';
import SignUpLogIn from '../SignUpLogIn/SignUpLogIn';

export default function Home({ openModal }) {
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

  const handleSignUpNowClick = () => {
    openModal(<SignUpLogIn closeModal={() => openModal(null)} />);
  };
//only want to render the library once the user is logged in. Instead, render the catalog comoonent once the user is logged in.
  return (
    <div data-testid='Home'>
      <img src={process.env.PUBLIC_URL + "/listful_logo.png"} alt="Listful Logo" />
      <h1>Save all your favorite books in one spot</h1>
      <p>Organize your books, one list at a time with your Listful Library, a web app that collates your library in one easy location.</p>
      <button onClick={handleSignUpNowClick}>Sign Up Now</button>
      
      {libraries.map((library) => (
        <ul key={library.id}>
          <li>
            <h2>{library.name}</h2>
            <Book libraryId={library.id}/>
          </li>
        </ul>
      ))}
    </div>
  );
};
