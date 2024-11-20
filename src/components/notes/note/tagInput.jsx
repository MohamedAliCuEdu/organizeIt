import React from "react";
import useNoteContext from "../../../hooks/useNoteContext";
import { RiAddLargeFill } from "react-icons/ri";

function TagInput() {
  const { newTag, handleNewTag, currentTags, addNewTag } = useNoteContext();
  return (
    <div className="tag-input">
      <input
        className="input-xsm-field"
        type="text"
        id="new-tag"
        name="tag"
        minLength="1"
        value={newTag}
        onChange={(e) => {
          handleNewTag(e.target.value);
        }}
        maxLength="10"
        placeholder="add new tag..."
        disabled={currentTags?.length >= 5}
      />
      <button
        className="dark-btn flex-center"
        type="button"
        onClick={() => {
          addNewTag(newTag);
        }}
        disabled={currentTags?.length >= 5 || newTag?.length < 1}
      >
        <RiAddLargeFill />
      </button>
    </div>
  );
}

export default TagInput;
