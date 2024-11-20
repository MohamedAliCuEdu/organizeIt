import React from "react";
import useAllNotesContext from "../../../hooks/useAllNotesContext";
import useNoteContext from "../../../hooks/useNoteContext";

function SelectTag() {
  const { allTags } = useAllNotesContext();
  const { currentTags, selectedTag, handleSelectTag } = useNoteContext();

  return (
    <select
      name="tags"
      id="select-tag"
      onChange={(e) => handleSelectTag(e.target.value)}
      disabled={currentTags?.length >= 5}
    >
      <option value="">---- select tag ----</option>
      {allTags.map((tag) => (
        <option key={tag} value={tag}>
          {tag}
        </option>
      ))}
    </select>
  );
}

export default SelectTag;
