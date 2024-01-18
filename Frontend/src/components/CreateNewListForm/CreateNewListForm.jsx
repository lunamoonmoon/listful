import React, { useState } from 'react';

const CreateNewListForm = ({ onSubmit, onCancel, books }) => {
  const [listName, setListName] = useState('');
  const [selectedBooks, setSelectedBooks] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Only submit if the list name is not empty and at least one book is selected
    if (listName.trim() && selectedBooks.length > 0) {
      onSubmit(listName, selectedBooks);
    }
  };

  const handleCheckboxChange = (bookId) => {
    // Toggle the selection status of the book
    setSelectedBooks((prevSelectedBooks) => {
      if (prevSelectedBooks.includes(bookId)) {
        return prevSelectedBooks.filter((id) => id !== bookId);
      } else {
        return [...prevSelectedBooks, bookId];
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        New List Name:
        <input type="text" value={listName} onChange={(event) => setListName(event.target.value)} />
      </label>
      <h4>Select books to add to the list:</h4>
      {books.map((book) => (
        <div key={book.id}>
          <input
            type="checkbox"
            id={`book-${book.id}`}
            checked={selectedBooks.includes(book.id)}
            onChange={() => handleCheckboxChange(book.id)}
          />
          <label htmlFor={`book-${book.id}`}>{book.volumeInfo.title}</label>
        </div>
      ))}
      <button type="submit">Create List</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default CreateNewListForm;
