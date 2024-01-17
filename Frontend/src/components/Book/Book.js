import React from "react";
import "./Book.scss";
import BookDetails from "../BookDetails/BookDetails";

export default function Book({ bookResults, openModal, closeModal }) {

  const handleAddBook = (book, closeModal) => {
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
    notifyUser();
  };

  function notifyUser() {
    openModal(
      <div>
      <p>Successfully added to your library!</p>
      </div>
    );
    setTimeout(() =>{
      closeModal();
    }, 1000);
  };

  function handlePostInsertBook(postData, closeModal) {
    fetch('http://localhost:8001/books/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(() => {
        // Book added successfully, close the modal
        closeModal();
      })
      .catch(error => console.error('Error:', error));
  };

  //googleAPI results are nested objects
  return (
    <div data-testid='Book' className="book">
      {bookResults && bookResults.map((book) => {
        return (
          <div key={book.id} className="book-container" onClick={() => {
            openModal(
              <BookDetails
                closeModal={() => openModal(null)}
                book={book}
                buttons={
                  <button onClick={() => handleAddBook(book, () => openModal(null))}>Add to my Library</button>
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
