import React from "react";
import useAllNotesContext from "../../../hooks/useAllNotesContext";
import useNoteContext from "../../../hooks/useNoteContext";
import FormBtns from "../../buttons/formBtns";
import { useNavigate } from "react-router";

function NoteForm({ children }) {
  const { saveNotePending, saveNoteApi } = useAllNotesContext();
  const { noteId, currentNote, currentTags } = useNoteContext();
  const navigate = useNavigate();

  // handle form submit:
  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveNoteApi(noteId, { ...currentNote, tags: currentTags });
    navigate(-1);
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      {children}
      <FormBtns
        disabled={saveNotePending || !currentNote?.content}
        submitValue={"save"}
      />
    </form>
  );
}

export default NoteForm;
