import { useState } from "react";
import * as React from 'react';
import "./Book.scss";
import BookDetails from "../BookDetails/BookDetails";

export default function Book({ bookResults, openModal }) {
  const [alertVisable, setAlertVisable] = useState(false);

  const handleAddBook = (book) => {
    const postData = {
      library_id: 1,
      name: book.volumeInfo.title,
      author: book.volumeInfo.author || 'no author',
      rating: 0,
      ownership: false,
      book_cover_link: book.volumeInfo.imageLinks?.smallThumbnail || 'no cover',
      notes: 'no notes',
    };
    handlePostInsertBook(postData);
  }

  function handlePostInsertBook(postData) {
    fetch('http://localhost:8001/books/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(() => {
        setAlertVisable(true);
      })
      .catch(error => console.error('Error:', error));
      // .catch(err => {
      //   setAlertVisable(true);
      // })
  };

  //googleAPI results are nested objects
  return (
    <div data-testid='Book' className="book">
      {/* { alertVisable && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          onClose={() => setAlertVisable(false)}
        >
          Here is a gentle confirmation that your action was successful.
        </Alert>
      )} */}
      {bookResults && bookResults.map((book) => {
        return (
          <div key={book.id} className="book-container" onClick={() => {
            openModal(
              <BookDetails
                closeModal={() => openModal(null)}
                book={book}
                buttons={
                  <button onClick={() => handleAddBook(book)}>Add to my Library</button>
                }
                title={book.volumeInfo.title}
              />
            );
          }}>
            {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail ? (
              <img key={book.id} src={book.volumeInfo.imageLinks.smallThumbnail} alt="cover of book" className="cover-image"></img>
            ) : (
              <p className="no-cover">No Cover Available</p>
            )}
            <h6>{book.volumeInfo.title}</h6>
          </div>
        );
      })}
    </div>
  );
};
