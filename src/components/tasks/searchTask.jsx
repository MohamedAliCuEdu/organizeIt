import React from "react";
import useTasksContext from "../../hooks/useTasksContext";
import { IoSearch } from "react-icons/io5";

function SearchTask() {
  const { searchInput, handleSearchInput } = useTasksContext();

  return (
    <div className="search-div">
      <input
        className="input-full-wd light-input"
        type="search"
        name="search-tasks"
        value={searchInput}
        maxLength="80"
        onChange={(e) => handleSearchInput(e.target.value)}
        placeholder="search..."
      />
      <IoSearch />
    </div>
  );
}

export default React.memo(SearchTask);
