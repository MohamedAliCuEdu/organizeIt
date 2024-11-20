import React from "react";

import UserLinks from "./userLinks";
import GestLinks from "./gestLinks";
import MainLinks from "./mainLinks";

import useAuth from "../../hooks/useAuth";

function Header() {
  console.log("---header");
  const { auth } = useAuth();

  return (
    <header>
      <div className="container">
        <MainLinks />
        {auth?.accessToken ? <UserLinks /> : <GestLinks />}
      </div>
    </header>
  );
}

export default Header;
