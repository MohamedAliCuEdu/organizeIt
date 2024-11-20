import React, { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutSideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        // callback();
        console.log("close")
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
export default useOutSideClick;