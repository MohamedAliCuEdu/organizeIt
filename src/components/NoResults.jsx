import React from "react";

function NoResults({ msg }) {
  console.log("no");
  return (
    <div className="no-results-match">
      <img src="/no-results.svg" alt="no-results" />
      <h4>{msg ? msg : "no search result found!"}</h4>
    </div>
  );
}

export default NoResults;
