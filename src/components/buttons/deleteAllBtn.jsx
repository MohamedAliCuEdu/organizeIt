import React from "react";
import { FaTrashCan } from "react-icons/fa6";

function DeleteAllBtn({ title, callBack, disabled }) {
  return (
    <button
      className="delete-all-btn"
      onClick={callBack}
      title={title ? title : "delete all"}
      disabled={disabled}
    >
      <span>delete all</span>
      <FaTrashCan />
    </button>
  );
}

export default DeleteAllBtn;
