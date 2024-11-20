import React from "react";
import { IoSearch } from "react-icons/io5";

function SearchInput({ searchInput, handleSearchInput }) {
  return (
    <div className="search-div">
      <input
        className="input-full-wd light-input"
        id="search-notes"
        type="search"
        value={searchInput}
        maxLength="20"
        onChange={(e) => handleSearchInput(e.target.value)}
        placeholder="search by title..."
      />
      <IoSearch />
    </div>
  );
}

export default SearchInput;
