import React from "react";
import { Link } from "react-router-dom";
import useLayoutContext from "../../hooks/useLayoutContext";
import NavLinks from "./navLinks";

function NavBar() {
  console.log("--naev");
  const { navDisplay, handleNavDisplay } = useLayoutContext();

  return (
    <nav className={navDisplay ? "view" : null}>
      <div
        className="nav-overlay overlay-element"
        onClick={handleNavDisplay}
      ></div>
      <div className="container">
        {navDisplay && (
          <div className="logo-btn">
            <Link to="/">OrganizeIt</Link>
          </div>
        )}
        <NavLinks />
      </div>
      {navDisplay && (
        <button
          type="button"
          className="close-nav-btn"
          onClick={handleNavDisplay}
          title="close menu"
        >
          &#88;
        </button>
      )}
    </nav>
  );
}

export default React.memo(NavBar);
