import React from "react";
import MESSAGES from "../constants/messages";

function ErrorDiv({ msg }) {
  return (
    <div className="error-msg-div">
      <video src="/error.webm" loop autoPlay />
      <p> {msg || MESSAGES.errors.default}</p>
    </div>
  );
}

export default ErrorDiv;
