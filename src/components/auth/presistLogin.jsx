import React, { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";

function PresistLogin() {
  const { auth, presist } = useAuth();
  const refresh = useRefreshToken();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMount = true;
    // 1. auto refresh token:
    const vetifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        isMount && setIsLoading(false);
      }
    };
    !auth?.accessToken && presist ? vetifyRefreshToken() : setIsLoading(false);
    return () => {
      isMount = false;
    };
  }, []);
  return <>{!presist ? <Outlet /> : isLoading ? "" : <Outlet />}</>;
}

export default PresistLogin;
