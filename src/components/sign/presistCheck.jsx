import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

function PresistCheck() {
  const { presist, setPresist } = useAuth();
  // handle presist check:
  function handlePresist() {
    setPresist((prev) => !prev);
  }
  // update presist in localStorage:
  useEffect(() => {
    localStorage.setItem("presist", presist);
  }, [presist]);

  return (
    <div className="remember-device">
      <input
        id="remember"
        type="checkbox"
        name="remember-device"
        onChange={handlePresist}
        checked={presist}
      />
      <label htmlFor="remember-device">remember me</label>
    </div>
  );
}

export default PresistCheck;
