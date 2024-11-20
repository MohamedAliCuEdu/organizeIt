import React from "react";
import SectionPopup from "../popups/components/section.popup";
import { FaHeading } from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";

function NoteViewPopup({ note, callBack }) {
  const tagId = React.useId();

  return (
    <SectionPopup callBack={callBack} popupName="note-view-popup">
      <h3 className="note-title">
        <FaHeading />
        {note.title || "no title"}
      </h3>
      <p className="note-content">{note.content}</p>
      <div className="note-tags">
        {note?.tags <= 0 ? (
          <p>
            <ImPriceTags />
            no tags.
          </p>
        ) : (
          note.tags.map((val, idx) => (
            <span className="tag-span xsm-btn white-gray-btn" key={tagId + idx}>
              {val}
            </span>
          ))
        )}
      </div>
    </SectionPopup>
  );
}

export default NoteViewPopup;
