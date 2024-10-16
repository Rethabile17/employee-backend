import React, { useState } from "react";

const SearchFunction = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search">
      <label>
        <span>Search</span>
      </label>
      <div className="search-content">
        <input
          className="search-input"
          type="text"
          placeholder="Search by ID"
          value={searchTerm}
          onChange={handleChange}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchFunction;
