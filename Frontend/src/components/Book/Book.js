import React from "react";
import "./Book.scss";
import BookDetails from "../BookDetails/BookDetails";

export default function Book({ bookResults, openModal }) {

  //googleAPI results are nested objects
  return (
    <div data-testid='Book' className="book">
      {bookResults && bookResults.map((book) => {
        return (
          <div key={book.id} className="book-container" onClick={() => {
            openModal(<BookDetails closeModal={() => openModal(null)} book={book} />)
          }}>
            {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail ? (
              <img key={book.id} src={book.volumeInfo.imageLinks.smallThumbnail} className="cover-image"></img>
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
