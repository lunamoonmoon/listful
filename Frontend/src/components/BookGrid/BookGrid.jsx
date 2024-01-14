import React from 'react';
import './BookGrid.scss'; 

const BookGrid = ({ books, onBookClick }) => {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <div key={book.id} className="book-item" onClick={() => onBookClick(book)}>
          <img src={book.coverImage} alt={book.title} />
        </div>
      ))}
    </div>
  );
};

export default BookGrid;
