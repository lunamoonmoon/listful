// BookGrid.js
import React, { useState } from 'react';
import './BookGrid.scss';
import Modal from '../Modal/Modal';
import Book from '../Book/Book';
import BookDetails from '../BookDetails/BookDetails';

const BookGrid = ({ books, setUserBooks, openModal }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleAddToUserBooks = () => {
    if (selectedBook && !books.find((userBook) => userBook.id === selectedBook.id)) {
      setUserBooks((prevUserBooks) => [...prevUserBooks, selectedBook]);
    }
    handleCloseModal();
  };
console.log("books: ", books)
  return (
    <div className="book-grid">
      {books && books.map((book) => (
        <div key={book.id} className="book-item" onClick={() => handleBookClick(book)}>
          <img src={book.volumeInfo.imageLinks.smallThumbnail} alt={book.volumeInfo.title} />
        </div>
      ))}
      {selectedBook && (
        <Modal
          title={selectedBook.title}
          body={<BookDetails book={selectedBook} />}
          closeModal={handleCloseModal}
          onAddToUserBooks={handleAddToUserBooks}
        />
      )}
    </div>
  );
};

export default BookGrid;
