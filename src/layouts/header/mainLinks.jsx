import React from "react";
import { Link } from "react-router-dom";

import { FiMenu } from "react-icons/fi";
import useLayoutContext from "../../hooks/useLayoutContext";

function MainLinks() {
  console.log("---left-links");
  const { handleNavDisplay } = useLayoutContext();

  return (
    <div className="main-links">
      <div className="menu-btn" onClick={handleNavDisplay}>
        <FiMenu />
      </div>
      <div className="header-logo-btn logo-btn">
        <Link to="/">OrganizeIt</Link>
      </div>
    </div>
  );
}

export default MainLinks;
