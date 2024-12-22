import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useAllNotesContext from "../../../hooks/useAllNotesContext";
import AllNotesIndex from "./allNotesIndex";
import NoResults from "../../NoResults";
import classNames from "classnames";
import NoteCard from "../noteCard";

function NotesList() {
  const { allNotes, searchInput, openNote, archiveNoteApi, deleteNoteApi } =
    useAllNotesContext();
  const [searchParams] = useSearchParams();
  let tagSP = searchParams.get("tag");

  const [list, setList] = useState([]);

  // filter notes:
  useEffect(() => {
    const filterNotes = allNotes.filter((note) => {
      let matchTag = tagSP ? note.tags?.includes(tagSP?.toLowerCase()) : true;
      let matchSearch =
        searchInput?.length > 0
          ? note.title?.toLowerCase().startsWith(searchInput.toLowerCase())
          : true;
      return matchTag && matchSearch;
    });
    setList(filterNotes);
  }, [allNotes, searchInput, tagSP]);

  return (
    <div
      className={classNames("notes-list", { "notes-grid": list?.length > 0 })}
    >
      {list.length <= 0 ? (
        <NoResults msg="No notes found with that title & same tag. Try a different keyword" />
      ) : (
        <>
          <AllNotesIndex.AddNoteCard />
          {list.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              archiveNoteApi={archiveNoteApi}
              deleteNoteApi={deleteNoteApi}
              callback={openNote}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default NotesList;
