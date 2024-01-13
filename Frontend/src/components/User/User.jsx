import React, { useState } from 'react';
import BookGrid from './BookGrid'; 
import ListsCarousel from './ListsCarousel'; 
import './User.scss';

export default function UserComponent() {
  const [isMyBooks, setIsMyBooks] = useState(true);

  const handleBookClick = (book) => {
    console.log("book cliked: ", book);
  }

  return (
    <div className="user-component">
      <div className="toggle-switch">
        <button onClick={() => setIsMyBooks(true)}>My Books</button>
        <button onClick={() => setIsMyBooks(false)}>My Lists</button>
      </div>
      {isMyBooks ? (
        <BookGrid books={books} onBookClick={handleBookClick} /> 
      ) : (
        <ListsCarousel lists={lists} onBookClick={handleBookClick}/> 
      )}
      <button className="create-list-button">Create a List</button>
    </div>
  );
}
