import React from "react";
import { useNavigate } from "react-router";
import useArchiveNotesContext from "../hooks/useArchiveNotesContext";
import ArchiveNotesIndex from "../components/notes/archiveNotes/archiveNotesIndex";
import NoteViewPopup from "../components/notes/noteView.popup";
import PageTitle from "../components/pageTitle";
import ErrorDiv from "../components/error-div";
import BulletLoading from "../components/loading/bulletsLoading";
import MainBackBtn from "../components/buttons/mainBackBtn";
import { FaArchive } from "react-icons/fa";
import MESSAGES from "../constants/messages";

function ArchiveNotes() {
  const {
    archiveNotes,
    isLoading,
    fetchDataErr,
    currentNote,
    noteView,
    handleNoteView,
  } = useArchiveNotesContext();

  // back to all notes page:
  const navigate = useNavigate();
  const backToAllNotes = () => {
    navigate("/all-notes", { replace: true });
  };

  return (
    <main className="archive-notes-page">
      <div className="container">
        <PageTitle title="archive">
          <FaArchive />
        </PageTitle>
        <ArchiveNotesIndex.ArchiveNotesHeader />
        {isLoading ? (
          <BulletLoading />
        ) : fetchDataErr ? (
          <ErrorDiv msg={MESSAGES.errors.failedLoadData} />
        ) : archiveNotes?.length <= 0 ? (
          <ArchiveNotesIndex.ArchiveNotesEmpty callBack={backToAllNotes} />
        ) : (
          <>
            <MainBackBtn title="all notes" callBack={backToAllNotes} />
            <ArchiveNotesIndex.ArchiveNotesList />
          </>
        )}
      </div>
      {noteView && (
        <NoteViewPopup note={currentNote} callBack={handleNoteView} />
      )}
    </main>
  );
}

export default ArchiveNotes;
