import React from "react";
import { IoClose } from "react-icons/io5";
// import useLayoutContext from "../../hooks/useLayoutContext";
// const {handleOverlayDisplay} = useLayoutContext();

function ClosePopupBtn({ callBack }) {
  return (
    <button className="close-btn" onClick={callBack}>
      <IoClose />
    </button>
  );
}

export default ClosePopupBtn;