import React from "react";
import { Link } from "react-router-dom";
import useAllNotesContext from "../../../hooks/useAllNotesContext";
import DeleteAllBtn from "../../buttons/deleteAllBtn";
import { IoArchive } from "react-icons/io5";
import usePopupContext from "../../../hooks/usePopupContext";
import MESSAGES from "../../../constants/messages";

function NotesHeader({ children }) {
  const { allNotes, deleteAllNotesApi } = useAllNotesContext();
  const { handleConfirmView } = usePopupContext();
  return (
    <header className="notes-header">
      <div className="header-content">
        {children}
        <div className="header-btns">
          <Link
            to="/all-notes/archive"
            className="archive-btn icon-btn lg-icon dark-btn"
            title="go to archive"
          >
            <IoArchive />
          </Link>
          <DeleteAllBtn
            title="delete all notes"
            callBack={() =>
              handleConfirmView(
                MESSAGES.confirm.deleteAllNotes,
                deleteAllNotesApi
              )
            }
            disabled={allNotes?.length <= 0}
          />
        </div>
      </div>
    </header>
  );
}

export default NotesHeader;
