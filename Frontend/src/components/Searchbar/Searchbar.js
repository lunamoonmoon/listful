import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Searchbar() {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const searchResults = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${text}`
      );
      {
        //display response
      }
    } catch (error) {
      console.error(`Error searching for books: ${error.message}`)
    }
  };

  const handleSearch = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="searchbar" data-testid="Searchbar">
      <form onSubmit={handleSubmit}>
        <input placeholder="Search Here" value={text} onChange={handleSearch}/>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
