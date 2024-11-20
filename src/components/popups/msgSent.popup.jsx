import React from "react";
import usePopupContext from "../../hooks/usePopupContext";
import MsgPopup from "./components/msgPopup";
import MESSAGES from "../../constants/messages";

function MsgSentPopup() {
  const { closePopup } = usePopupContext();
  return (
    <MsgPopup popupName="message-sent-popup">
      <video src="./message-sent.webm" loop autoPlay />
      <p>
        {MESSAGES.success.sendMessage}
        <span className="emoji"> 😉</span>
      </p>
      <button className="success-btn md-btn green-btn" onClick={closePopup}>
        done
      </button>
    </MsgPopup>
  );
}

export default MsgSentPopup;
