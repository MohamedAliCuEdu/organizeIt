import React from "react";
import { IoClose } from "react-icons/io5";

function ClosePopupBtn({ callBack }) {
  return (
    <button className="close-btn" onClick={callBack}>
      <IoClose />
    </button>
  );
}

export default ClosePopupBtn;
