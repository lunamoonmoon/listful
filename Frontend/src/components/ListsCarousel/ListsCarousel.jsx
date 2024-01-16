import React from "react";
import "./ListsCarousel.scss";
import BookGrid from "../BookGrid/BookGrid";
import CreateNewListForm from "../CreateNewListForm/CreateNewListForm";

const ListsCarousel = ({ libraries, onBookClick, onCreateList }) => {
  return (
    <div className="lists-carousel">
      <div className="carousel-container">
        {libraries &&
          libraries.map((library, index) => (
            <div key={index} className="list-item">
              <h3>{library.category}</h3>
              {library.books.length > 0 ? (
                <BookGrid
                  books={library.books}
                  onBookClick={onBookClick}
                  onCreateList={onCreateList}
                  />
                ) : (<p>No books in this list yet!</p>)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListsCarousel;
