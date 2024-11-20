import React from "react";
import useNoteContext from "../../../hooks/useNoteContext";
import { FaHeading } from "react-icons/fa";

function NoteInputsSection() {
  const { currentNote, handleCurrentNote } = useNoteContext();
  return (
    <section className="note-inputs-section">
      <div className="input-div title-div">
        <FaHeading />
        <input
          className="input-flex-wd"
          type="text"
          id="title"
          name="title"
          maxLength="20"
          placeholder="title..."
          value={currentNote?.title || ""}
          onChange={handleCurrentNote}
        />
      </div>
      <div className="textarea-div">
        <textarea
          id="content"
          name="content"
          minLength="1"
          maxLength="1500"
          placeholder="type...."
          value={currentNote?.content || ""}
          onChange={handleCurrentNote}
          required
        />
        <span className="content-counter">
          {currentNote?.content?.length || 0}/1500
        </span>
      </div>
    </section>
  );
}

export default NoteInputsSection;
