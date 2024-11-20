import React from "react";
import { Link, useLocation } from "react-router-dom";

function AccountMsg() {
  console.log("account msg ----")
  const location = useLocation();

  return (
    <>
      {location.pathname === "/signup" && (
        <p className="account-msg">
          have already account? <Link to="/login">log in</Link>.
        </p>
      )}
      {location.pathname === "/login" && (
        <p className="account-msg">
          don't have account yet? <Link to="/signup">sign up</Link>.
        </p>
      )}
    </>
  );
}

export default React.memo(AccountMsg);
