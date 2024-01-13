import React from 'react';
import './ListsCarousel.scss'; 
import BookGrid from './BookGrid';
import CreateNewListForm from '../CreateNewListForm/CreateNewListForm';

const ListsCarousel = ({ lists, onBookClick, onCreateList }) => {
  return (
    <div className="lists-carousel">
      {/* Display lists using a horizontal scrolling carousel */}
      <div className="carousel-container">
        {lists.map((list) => (
          <div key={list.id} className="list-item">
            {/* Display list name */}
            <h3>{list.name}</h3>
            {/* Render books associated with the list */}
            <BookGrid books={list.books} onBookClick={onBookClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListsCarousel;
