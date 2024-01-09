import React from "react";

export default function Book({ searchResults }) {

  //googleAPI results are nested objects
  return (
    <div data-testid='Book'>
      {searchResults && searchResults.map((book) => {
        return (
          <div key={book.id}>
            <h2>{book.volumeInfo.title}</h2>
            <p>{book.volumeInfo.authors}</p>
            <p>{book.volumeInfo.description}</p>
            <p>{book.volumeInfo.categories}</p>
            <p>{book.volumeInfo.averageRating}</p>
          </div>
        );
      })}
    </div>
  );
};
