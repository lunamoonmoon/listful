import React, { useState } from "react";
import Book from "../Book/Book";

export default function Catalogue() {

  const [bookResults, setBookResults] = useState();

  //lets catalogue go to backend and fetch from api
  async function handleCatalogue() {
    const searchInput = document.getElementById('searchValue').value;
    try {
      const res = await fetch(`http://localhost:8001/search?searchTerm=${searchInput}`, {
      method: 'GET',
    })
    if(!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data = await res.json();
    setBookResults(data);
    } catch(err) {
      console.error(`Error fetching books: ${err}`)
    }
  }

  return (
    <div data-testid='Catalogue'>
      < Book bookResults={bookResults} />
    </div>
  );
};
