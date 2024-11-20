import React from "react";
import useNoteContext from "../../../hooks/useNoteContext";
import { ImPriceTags } from "react-icons/im";
import { TiDelete } from "react-icons/ti";

function NoteTags() {
  const { currentTags, removeTag } = useNoteContext();
  return (
    <div className="note-tags">
      {currentTags?.length <= 0 ? (
        <p>
          <ImPriceTags/>
          no tags.
        </p>
      ) : (
        currentTags.map((val, idx) => {
          return (
            <span key={idx} className="tag-span xsm-btn white-gray-btn">
              {val} <TiDelete onClick={() => removeTag(val)} />
            </span>
          );
        })
      )}
    </div>
  );
}

export default NoteTags;
