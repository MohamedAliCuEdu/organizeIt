import React from "react";
import { BsFillEmojiSmileUpsideDownFill } from "react-icons/bs";

function NoContent({children}) {
  return (
    <div className="empty-list">
      <BsFillEmojiSmileUpsideDownFill />
      <h2>there is no content yet!</h2>
      {children}
    </div>
  );
}

export default NoContent;