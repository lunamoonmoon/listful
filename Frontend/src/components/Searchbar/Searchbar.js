import React, { useState } from 'react';
import "./Searchbar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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
        <i><FontAwesomeIcon icon={faMagnifyingGlass} /></i>
        <input placeholder="      Find Your Book" type="search" name='search' value={query} onChange={handleQuery}/>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
