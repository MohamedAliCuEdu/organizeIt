import React from "react";
import { useNavigate } from "react-router";

function FormBtns({ submitValue, disabled, backValue, handleBackBtn }) {
  const navigate = useNavigate();

  const backToPreviousPAge = () => {
    handleBackBtn ? handleBackBtn() : navigate(-1);
  };

  return (
    <div className="form-btns">
      <button className="submit-btn blue-btn" type="submit" disabled={disabled}>
        {submitValue}
      </button>
      <button
        className="back-btn dark-btn"
        type="button"
        onClick={backToPreviousPAge}
      >
        {backValue ? backValue : "back"}
      </button>
    </div>
  );
}

export default FormBtns;
