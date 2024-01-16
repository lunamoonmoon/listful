import React from "react";
import './ScrollToTop.scss';

export default function ScrollToTop() {

  function handleScroll() {
    window.scrollTo(0, 0);
  };

  return (
    <div className="scroll">
      <button
        onClick={handleScroll}
        className="scroll-button"
      >
        Go to Top
      </button>
    </div>
  )
};
