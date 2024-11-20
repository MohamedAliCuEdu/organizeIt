import React from "react";
import { Link } from "react-router-dom";

import { MdLogin } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";

function GestLinks() {
  return (
    <div className="gest-links">
      <Link className="icon-btn" to="/login" title="login">
        <MdLogin />
      </Link>
      <Link className="icon-btn" to="/signup" title="sign up">
        <FiUserPlus />
      </Link>
    </div>
  );
}

export default GestLinks;
