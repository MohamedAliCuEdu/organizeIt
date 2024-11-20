import React from "react";
import { useSearchParams } from "react-router-dom";
import classNames from "classnames";

function TagFilter({ allTags }) {
  const [searchParams, setSearchParams] = useSearchParams();
  let tagSP = searchParams.get("tags");

  const handleTagSP = (tag) => {
    tag ? searchParams.set("tag", tag) : searchParams.delete("tag");
    setSearchParams(searchParams);
  };

  return (
    <div className="tags-filter">
      <button
        className="dark-btn sm-btn bold"
        to="all-notes"
        onClick={() => handleTagSP("")}
      >
        all
      </button>
      {allTags.map((tag) => {
        return (
          <button
            className={classNames("white-gray-btn dark-hover sm-btn", {
              active: tagSP === tag,
            })}
            key={tag}
            onClick={() => handleTagSP(tag)}
            relative="path"
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}

export default TagFilter;
