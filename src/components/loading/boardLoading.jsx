import React from "react";

function BoardLoading({ linesCount }) {
  const elements = Array.from({ length: linesCount }, (_, index) => (
    <div className="load-wraper" key={index}>
      <div className="activity"></div>
    </div>
  ));

  return <div className="board-loading">{elements}</div>;
}

export default BoardLoading;
