import React, { useState } from 'react';
import "./Searchbar.scss";

export default function Searchbar({ handleSearch }) {
  const [query, setQuery] = useState([]);

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
        {/* <i><FontAwesomeIcon icon={faMagnifyingGlass} /></i> */}
        <input placeholder="Find Your Book" id="searchValue" type="search" name='search' value={query} onChange={handleQuery}/>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
