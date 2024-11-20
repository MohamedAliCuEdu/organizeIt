import React from "react";
import usePopupContext from "../../hooks/usePopupContext";
import MsgPopup from "./components/msgPopup";

function ErrMsgPopup() {
  const { errMsg, closePopup } = usePopupContext();

  return (
    <MsgPopup popupName="error-popup">
      <video src="/error.webm" loop autoPlay />
      <p>{errMsg}</p>
      <button className="close-btn md-btn red-btn" onClick={closePopup}>
        close
      </button>
    </MsgPopup>
  );
}

export default ErrMsgPopup;
