import React from "react";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import MainBackBtn from "../../buttons/mainBackBtn";

function ArchiveNotesEmpty({callBack}) {
  return (
    <div className="empty-list">
      <HiArchiveBoxXMark />
      <h2>archive is empty!</h2>
      <MainBackBtn title="back to all notes" callBack={callBack}/>
    </div>
  );
}

export default ArchiveNotesEmpty;
