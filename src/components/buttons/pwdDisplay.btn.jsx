import React from "react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

function PwdDisplayBtn({ pwdDisplay, callback }) {
  return (
    <button
      className="pwd-display-btn"
      type="button"
      title={`${pwdDisplay ? "hide" : "show"} password`}
      onClick={callback}
    >
      {pwdDisplay ? <BiHide /> : <BiShow />}
    </button>
  );
}

export default PwdDisplayBtn;
