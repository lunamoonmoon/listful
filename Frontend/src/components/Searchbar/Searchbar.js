import React, { useState } from 'react';

export default function Searchbar() {
  const [query, setQuery] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  //api call
  const handleSearch = async (query) => {
    console.log(query);
    setSearchResults('')
  };

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
    setQuery('');
  };

  return (
    <div className="searchbar" data-testid="Searchbar">
      <form onSubmit={handleSubmit}>
        <input placeholder="Search Here" type="text" value={query} onChange={handleQuery}/>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
