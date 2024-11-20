import React from "react";
import AllNotesIndex from "../components/notes/allNotes/allNotesIndex";
import BulletsLoading from "../components/loading/bulletsLoading";
import ErrorDiv from "../components/error-div";
import useAllNotesContext from "../hooks/useAllNotesContext";
import PageTitle from "../components/pageTitle";
import NoContent from "../components/noContent";
import { CgNotes } from "react-icons/cg";
import { PiNotePencilBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import SearchInput from "../components/searchInput";
import usePopupContext from "../hooks/usePopupContext";
import MESSAGES from "../constants/messages";

function Notes() {
  const { confirmMsg } = usePopupContext();
  const {
    allNotes,
    allTags,
    isLoading,
    fetchDataErr,
    searchInput,
    handleSearchInput,
  } = useAllNotesContext();
  console.log(confirmMsg)

  return (
    <main className="all-notes-page">
      <div className="container">
        <PageTitle title="notes">
          <CgNotes />
        </PageTitle>
        <AllNotesIndex.NotesHeader>
          <SearchInput
            searchInput={searchInput}
            handleSearchInput={handleSearchInput}
          />
        </AllNotesIndex.NotesHeader>
        {allTags?.length > 0 && <AllNotesIndex.TagsFilter allTags={allTags} />}
        <div className="notes-content">
          {isLoading ? (
            <BulletsLoading />
          ) : fetchDataErr ? (
            <ErrorDiv msg={MESSAGES.errors.failedLoadData} />
          ) : allNotes?.length <= 0 ? (
            <NoContent>
              <Link className="dark-btn md-btn" to="note">
                new note <PiNotePencilBold />
              </Link>
            </NoContent>
          ) : (
            <AllNotesIndex.NotesList />
          )}
          {/* <AllNotesIndex.NotesBoard /> */}
        </div>
      </div>
    </main>
  );
}
export default Notes;
