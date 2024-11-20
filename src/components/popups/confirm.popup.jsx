import React from "react";
import usePopupContext from "../../hooks/usePopupContext";
import MsgPopup from "./components/msgPopup";

function ConfirmPopup() {
  const { confirmMsg, confirmAction, cancelAction } = usePopupContext();

  return (
    <MsgPopup popupName="confirm-popup">
      <span className="emoji">&#129320;</span>
      <p>{confirmMsg}</p>
      <div className="action-btns">
        <button
          type="button"
          className="md-btn green-btn"
          onClick={confirmAction}
        >
          yes
        </button>
        <button type="button" className="md-btn red-btn" onClick={cancelAction}>
          no
        </button>
      </div>
    </MsgPopup>
  );
}

export default ConfirmPopup;
