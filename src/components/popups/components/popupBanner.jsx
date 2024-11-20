import React from "react";
import { IoClose } from "react-icons/io5";

function PopupBanner({ callBack }) {
  return (
    <div className="banner">
      <button className="close-btn red-btn" onClick={callBack}>
        <IoClose />
      </button>
    </div>
  );
}

export default PopupBanner;
