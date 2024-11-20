import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBackward } from "react-icons/fa";

function MainBackBtn({ title, callBack }) {
  const navigate = useNavigate();

  function backToPrevious() {
    navigate(-1, {replace: true});
  }

  return (
    <button
      className="main-back-btn dark-btn md-btn"
      title="back to previous page"
      onClick={callBack ? callBack : backToPrevious}
    >
      <FaBackward />
      {title ? title : "go back"}
    </button>
  );
}

export default MainBackBtn;
