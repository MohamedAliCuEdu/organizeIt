import React from "react";
import useLayoutContext from "../hooks/useLayoutContext";

function OverlayElement({callback}) {
  const { handleOverlayDisplay } = useLayoutContext();
  return (
    <div
      className="overlay-element"
      onClick={() => {
        callback();
        handleOverlayDisplay();
      }}
    ></div>
  );
}

export default OverlayElement;
