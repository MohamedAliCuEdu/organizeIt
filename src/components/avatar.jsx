import React from "react";
import useAuth from "../hooks/useAuth";

function Avatar({ children, bg}) {
  const { auth } = useAuth();
  return (
    <span className="avatar flex-center" style={{backgroundColor: bg}}>
      {auth.userInfo.username[0].toUpperCase()}
      {children}
    </span>
  );
}

export default React.memo(Avatar);
