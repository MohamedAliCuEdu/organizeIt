import React from "react";
import usePopupContext from "../../hooks/usePopupContext";
import MsgPopup from "./components/msgPopup";

function SuccessPopup() {
  const { successMsg, successAction } = usePopupContext();

  return (
    <MsgPopup popupName="success-popup">
      <video src="./success_animation.webm" loop autoPlay />
      <p>{successMsg}</p>
      <button className="success-btn md-btn green-btn" onClick={successAction}>
        done
      </button>
    </MsgPopup>
  );
}

export default SuccessPopup;
