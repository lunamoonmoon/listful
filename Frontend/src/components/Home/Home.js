import React from 'react';
import SignUpLogIn from '../SignUpLogIn/SignUpLogIn';
import Book from '../Book/Book';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import './Home.scss';

export default function Home({ openModal, closeModal, bookResults }) {

  const handleSignUpNowClick = () => {
    openModal(<SignUpLogIn closeModal={() => openModal(null)} />);
  };

  return (
    <div data-testid='Home'>
      {bookResults.length > 0 ? (
        <div>
          <Book bookResults={bookResults} openModal={openModal} closeModal={closeModal} />
          <ScrollToTop />
        </div>
      ) : (
        <div className='home-container'>
          <div className="logo">
            <img src={process.env.PUBLIC_URL + "/listful_logo_transparent_graphic.png"}alt="Listful Logo" />
          </div>
          <div className='home-hero'>
          <h1 className='heading'>Save all your favourite books in one spot</h1>
          <p>Organize your books, one list at a time with your Listful Library, a web app that collates your library in one easy location.</p>
          <button onClick={handleSignUpNowClick}>Sign Up Now</button>
          </div>
        </div>
      )}
    </div>
  );
};
