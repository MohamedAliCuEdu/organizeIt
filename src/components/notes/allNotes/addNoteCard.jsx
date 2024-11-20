import React from "react";
import { useNavigate } from "react-router";
import { SlNote } from "react-icons/sl";

function AddNoteCard() {
  const navigate = useNavigate();

  const openNewNote = () => {
    navigate("note");
  };

  return (
    <div className="add-note" onClick={openNewNote}>
      <SlNote />
      <h3>add new note</h3>
    </div>
  );
}

export default AddNoteCard;
