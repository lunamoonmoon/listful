import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from '../Book/Book';
import SignUpLogIn from '../SignUpLogIn/SignUpLogIn';
import './Home.scss';

export default function Home({ openModal, searchResults }) {

  //get libraries from db
  // const [libraries, setLibraries] = useState([]);
  // const [openModal, setOpenModal] = useState(false);

  // useEffect(() => {
  //   axios.get('http://localhost:8001/libraries')
  //     .then(response => {
  //       setLibraries(response.data);
  //     })
  //     .catch(err => {
  //       console.error(`Error fetching libraries: ${err}`);
  //     });
  // }, []);



  const handleSignUpNowClick = () => {
    openModal(<SignUpLogIn closeModal={() => openModal(null)} />);
  };
//only want to render the library once the user is logged in. Instead, render the catalog comoonent once the user is logged in.
  return (
    <div data-testid='Home'>
      <div className='home-container'>
        <div className="logo">
          <img src={process.env.PUBLIC_URL + "/listful_logo_graphic.png"}alt="Listful Logo" />
        </div>
        {/* <Book searchResults={searchResults}/> */}
        <div className='home-hero'>
        <h1 className='heading'>Save all your favourite books in one spot</h1>
        <p>Organize your books, one list at a time with your Listful Library, a web app that collates your library in one easy location.</p>
        <button onClick={handleSignUpNowClick}>Sign Up Now</button>
        </div>
        {/* {libraries.map((library) => (
          <ul key={library.id}>
            <li>
                <h2>{library.name}</h2>
            </li>
          </ul>
        ))}; */}
        {/* {openModal && (
          <Modal setOpenModal={setOpenModal}></Modal>
        )}
        {/* {isModalOpen && (
          <SearchResultModal
            SearchResults={setSearchResults}
            closeModal={() => setIsModalOpen(false)}
          />
        )} */}
      </div>
    </div>
  );
};
