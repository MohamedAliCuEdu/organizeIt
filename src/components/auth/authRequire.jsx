import React from "react";
import { Outlet, useLocation, Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";

function AuthRequire() {
  const { auth } = useAuth();
  let location = useLocation();
  
  return !auth ? (
    <Navigate to="/login" state={{ from: location.pathname }} />
  ) : (
    <Outlet />
  );
}

export default AuthRequire;
