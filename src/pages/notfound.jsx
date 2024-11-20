import React from "react";
import MainBackBtn from "../components/buttons/mainBackBtn";

function NotFound() {
  return (
    <main className="notfound-page">
      <div className="container">
        <img src="/404-page.png" alt="404" title="404"/>
        <h2 className="notfound-msg">page not found!</h2>
        <MainBackBtn/>
      </div>
    </main>
  );
}
export default NotFound;
