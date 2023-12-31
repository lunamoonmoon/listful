import React from "react";

export default function Book({ searchResults }) {

  const books = searchResults.items;
  //googleAPI results are nested objects
  return (
    <div data-testid='Book'>
      {books && books.map((book) => {
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
