import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

function ArrowBackBtn() {
  return (
    <Link className="back-btn" to=".." relative="path">
      <FaArrowLeft />
    </Link>
  );
}

export default ArrowBackBtn;
