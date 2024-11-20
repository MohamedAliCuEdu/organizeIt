import React, { useState, useEffect } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

const LayoutContext = React.createContext({});

export function LayoutProvider({ children }) {
  const windowDimensions = useWindowDimensions();

  // handle overlay display:
  const [overlayDisplay, setOverlayDisplay] = useState(false);
  const handleOverlayDisplay = React.useCallback(() => {
    setOverlayDisplay(!overlayDisplay);
  }, [overlayDisplay]);

  // handle nav display state:
  const [navDisplay, setNavDisplay] = useState(true);
  const handleNavDisplay = React.useCallback(() => {
    setNavDisplay(!navDisplay);
  }, [navDisplay]);

  // stop display nav element when resize to small screen:
  useEffect(() => {
    windowDimensions.width < 768 && setNavDisplay(false);
    windowDimensions.width > 768 && setNavDisplay(true);
  }, [windowDimensions]);

  return (
    <LayoutContext.Provider
      value={{
        overlayDisplay,
        handleOverlayDisplay,
        navDisplay,
        handleNavDisplay,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export default LayoutContext;
