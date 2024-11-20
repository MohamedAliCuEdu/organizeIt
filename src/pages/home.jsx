import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

import Confetti from "react-confetti";
import HomeIndex from "../components/home";

function HomePage() {
  console.log("home page");
  const { auth } = useAuth();

  const [party, setParty] = useState(true);
  function celebrate() {
    setParty(!party);
  }

  return (
    <main className="home-page screen-height">
      {auth && party && <Confetti className="celebrate-canvas" />}
      <HomeIndex.HomeIntro />
      <div className="home-links">
        {!auth ? (
          <HomeIndex.HomeLinks />
        ) : (
          <button className="md-btn dark-btn" type="button" onClick={celebrate}>
            {party ? "time for work" : "let`s celebrate!"}
          </button>
        )}
      </div>
    </main>
  );
}
export default HomePage;
