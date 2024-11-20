import React from "react";
import NoteIndex from "./noteIndex";
import useAllNotesContext from "../../../hooks/useAllNotesContext";

function TagInputsSection() {
  const { allTags } = useAllNotesContext();
  return (
    <section className="tags-inputs-section">
      <NoteIndex.NoteTags />
      {allTags?.length > 0 && <NoteIndex.SelectTag />}
      <NoteIndex.TagInput />
    </section>
  );
}

export default TagInputsSection;
