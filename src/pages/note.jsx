import React from "react";
import useNoteContext from "../hooks/useNoteContext";
import NoteIndex from "../components/notes/note/noteIndex";
import PageTitle from "../components/pageTitle";
import { FiEdit } from "react-icons/fi";

function Note() {
  console.log("note edit page");
  const { noteId, noteDates } = useNoteContext();
  return (
    <main className="note-page">
      <div className="container">
        <PageTitle title={noteId ? "edit Note" : "new note"}>
          <FiEdit />
        </PageTitle>
        <div className="note-content">
          {noteId && <NoteIndex.NoteDates noteDates={noteDates} />}
          <NoteIndex.NoteForm>
            <NoteIndex.NoteInputsSection />
            <NoteIndex.TagsInputsSection />
          </NoteIndex.NoteForm>
        </div>
      </div>
    </main>
  );
}

export default Note;
