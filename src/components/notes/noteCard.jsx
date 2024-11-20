import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";
import { MdOutlineArchive, MdOutlineUnarchive } from "react-icons/md";
import usePopupContext from "../../hooks/usePopupContext";
import MESSAGES from "../../constants/messages";

function NoteCard({
  note,
  deleteNoteApi,
  archiveNoteApi,
  unArchiveNoteApi,
  callback,
}) {
  const { handleConfirmView } = usePopupContext();
  const { _id, title, content, createdAt, isArchived } = note;
  let date = new Date(createdAt).toDateString();

  const tagId = React.useId();

  return (
    <div className="note-card">
      <div
        className="note-content"
        onClick={() => {
          callback(_id);
        }}
      >
        <h5>{title ? title : "no title"}</h5>
        <p>{content}</p>
      </div>
      <div className="info">
        <div className="tags">
          {note?.tags?.length <= 0 ? (
            <p>
              <ImPriceTags />
              no tags.
            </p>
          ) : (
            note.tags.map((val, idx) => (
              <span
                className="tag-span xsm-btn white-gray-btn"
                key={tagId + idx}
              >
                {val}
              </span>
            ))
          )}
        </div>
        <p className="note-date">{date}</p>
      </div>
      <div className="note-options">
        <button
          className="note-icon-btn delete-btn"
          onClick={() =>
            handleConfirmView(MESSAGES.confirm.deleteSingleNote, () =>
              deleteNoteApi(_id)
            )
          }
          title="delete"
        >
          <FaTrashAlt />
        </button>
        {isArchived ? (
          <button
            className="note-icon-btn archive-btn"
            onClick={() =>
              handleConfirmView(MESSAGES.confirm.urAchiveSingleNote, () =>
                unArchiveNoteApi(_id)
              )
            }
            title="move from archive"
            >
            {<MdOutlineUnarchive />}
          </button>
        ) : (
          <button
          className="note-icon-btn archive-btn"
          onClick={() =>
            handleConfirmView(MESSAGES.confirm.archiveSingleNote, () =>
            archiveNoteApi(_id)
            )
          }
            title="add to archive"
          >
            <MdOutlineArchive />
          </button>
        )}
      </div>
    </div>
  );
}

export default NoteCard;
