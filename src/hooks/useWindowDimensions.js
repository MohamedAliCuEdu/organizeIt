import { useState, useEffect } from 'react';

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // update the state with the current window dimensions:
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    // Add event listener for resize events
    window.addEventListener('resize', handleResize);
    // Call handleResize initially to set the initial dimensions:
    handleResize();
    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowDimensions;
}

export default useWindowDimensions;
