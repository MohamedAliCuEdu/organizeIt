import React from "react";
import useArchiveNotesContext from "../../../hooks/useArchiveNotesContext";
import SearchInput from "../../searchInput";
import DeleteAllBtn from "../../buttons/deleteAllBtn";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import usePopupContext from "../../../hooks/usePopupContext";
import MESSAGES from "../../../constants/messages";

function ArchiveNotesHeader() {
  const {
    archiveNotes,
    searchInput,
    handleSearchInput,
    unArchiveAllNotesApi,
    deleteAllArchiveNotesApi,
  } = useArchiveNotesContext();
  const { handleConfirmView } = usePopupContext();

  return (
    <header className="archive-notes-header">
      <div className="header-content">
        <SearchInput
          searchInput={searchInput}
          handleSearchInput={handleSearchInput}
        />
        <div className="header-btns">
          <button
            className="unarchive-all-btn icon-btn lg-icon dark-btn"
            type="button"
            title="remove all notes from archive"
            disabled={archiveNotes?.length <= 0}
            onClick={() =>
              handleConfirmView(
                MESSAGES.confirm.unArchiveAllNotes,
                unArchiveAllNotesApi
              )
            }
          >
            <RiInboxUnarchiveFill />
          </button>
          <DeleteAllBtn
            callBack={() =>
              handleConfirmView(
                MESSAGES.confirm.deleteAllNotes,
                deleteAllArchiveNotesApi
              )
            }
            title="delete all notes"
            disabled={archiveNotes?.length <= 0}
          />
        </div>
      </div>
    </header>
  );
}

export default ArchiveNotesHeader;
