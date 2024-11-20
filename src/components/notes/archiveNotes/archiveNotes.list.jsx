import React, { useState, useEffect } from "react";
import useArchiveNotesContext from "../../../hooks/useArchiveNotesContext";
import classNames from "classnames";
import NoResults from "../../NoResults";
import NoteCard from "../noteCard";

function ArchiveNotesList() {
  const {
    archiveNotes,
    searchInput,
    unArchiveNoteApi,
    deleteNoteApi,
    handleNoteView,
  } = useArchiveNotesContext();

  const [list, setList] = useState([]);

  // filter notes:
  useEffect(() => {
    let filterNotes =
      searchInput.length <= 0
        ? archiveNotes
        : archiveNotes.filter((note) =>
            note.title?.toLowerCase().startsWith(searchInput.toLowerCase())
          );

    setList(filterNotes);
  }, [archiveNotes, searchInput]);

  return (
    <div
      className={classNames("archive-notes-list", {
        "notes-grid": list?.length > 0,
      })}
    >
      {list.length <= 0 ? (
        <NoResults msg="No notes found with that title." />
      ) : (
        list.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            unArchiveNoteApi={unArchiveNoteApi}
            deleteNoteApi={deleteNoteApi}
            callback={handleNoteView}
          />
        ))
      )}
    </div>
  );
}

export default ArchiveNotesList;
