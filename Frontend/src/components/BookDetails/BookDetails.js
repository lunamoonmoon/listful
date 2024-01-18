import React from "react";
import "./BookDetails.scss";

export default function Book({ book }) {
  const {
    id,
    title,
    authors,
    description,
    notes,
  } = book.volumeInfo

  const handleStars = (stars) => {
    let numStars = [];
    for(let i = 0; i < stars; i++) {
      numStars.push(<p key={i}>&#9733;</p>);
    }
    return numStars;
  };

  return (
    <div data-testid='book-details' className="book-details">
          <div key={id}>
            <div className="img-container">
              {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail ? (
                <img src={book.volumeInfo.imageLinks.smallThumbnail} className="cover-image" alt="cover of book"></img>
              ) : (
                <p className="no-cover">No Cover Available</p>
              )}
            </div>
            <div className="heading">
              <h2 className="title">{title}</h2>
              <div className="stars">
                {book.volumeInfo.averageRating ? (handleStars(book.volumeInfo.averageRating)) : null}
              </div>
            </div>
            <p>by {authors.join(', ')}</p>
            <p>{notes}</p>
          </div>
    </div>
  );
};
