import React from "react";

function MsgTextarea({ msg, handleMsgInput }) {
  return (
    <div className="msg-textarea textarea-container">
      <textarea
        name="message"
        id="message"
        minLength="1"
        maxLength="1500"
        placeholder="type here..."
        value={msg}
        onChange={(e) => handleMsgInput(e.target.value)}
        required
      ></textarea>
      <span className="content-counter">{msg.length}/1500</span>
    </div>
  );
}

export default MsgTextarea;
