import React from "react";
import "./BookDetails.scss";

export default function Book({ book }) {

  const handleStars = (stars) => {
    let numStars = [];
    for(let i = 0; i < stars; i++) {
      numStars.push(<p key={i}>&#9733;</p>);
    }
    return numStars;
  };

  return (
    <div data-testid='book-details' className="book-details">
          <div key={book.id}>
            <div className="img-container">
              {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail ? (
                <img src={book.volumeInfo.imageLinks.smallThumbnail} className="cover-image" alt="cover of book"></img>
              ) : (
                <p className="no-cover">No Cover Available</p>
              )}
            </div>
            <div className="heading">
              <h2 className="title">{book.volumeInfo.title}</h2>
              <div className="stars">
                {book.volumeInfo.averageRating ? (handleStars(book.volumeInfo.averageRating)) : null}
              </div>
            </div>
            <p>by {book.volumeInfo.authors.join(', ')}</p>
            <p>{book.volumeInfo.description}</p>
          </div>
    </div>
  );
};
