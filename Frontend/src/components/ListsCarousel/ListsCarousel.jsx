import React from "react";
import Slider from "react-slick";
import "./ListsCarousel.scss";
import BookGrid from "../BookGrid/BookGrid";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ListsCarousel = ({ libraries, onBookClick, onCreateList }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, 
    slidesToScroll: 6,
  };

  return (
    <div className="lists-carousel">
      {libraries &&
        libraries.map((library, index) => (
          <div key={index} className="list-item">
            <h3>{library.category}</h3>
            {library.books && library.books.length > 0 ? (
              <Slider {...sliderSettings}>
                {library.books.map((book, bookIndex) => (
                  <div key={bookIndex}>
                    <BookGrid
                      books={[book]}
                      onBookClick={onBookClick}
                      onCreateList={onCreateList}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <p>No books in this list yet!</p>
            )}
          </div>
        ))}
    </div>
  );
};

export default ListsCarousel;
