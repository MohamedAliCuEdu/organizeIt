import React from "react";
import MainBackBtn from "../components/buttons/mainBackBtn";

function Soon() {
  return (
    <main className="soon-page">
      <div className="container">
        <video src="./under_construction.mp4" loop autoPlay />
        <h2>
          page under construction
          <span className="emoji">&#128578;</span>
        </h2>
        <p>
          we're putting the finishing touches on this page. Please check back
          soon!"
        </p>
        <MainBackBtn />
      </div>
    </main>
  );
}

export default Soon;
