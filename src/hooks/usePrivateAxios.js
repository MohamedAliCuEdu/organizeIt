import { useEffect } from "react";
import { axiosPrivateApi } from "../services/api";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

function usePrivateAxios() {
  // 1. get refresh() & auth:
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  // 2. creata interceptors for each res & req:
  useEffect(() => {
    // check if config have [authentication] header:
    const reqIntercept = axiosPrivateApi.interceptors.request.use(
      (config) => {
        if (!config.headers.authentication) {
          config.headers.authentication = auth.accessToken;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );
    // check if ther response err (403) have [authentication] header:
    const resIntercept = axiosPrivateApi.interceptors.response.use(
      (res) => res,
      async (err) => {
        console.log(err);
        const prevReq = err?.config;
        const newAccessToken = await refresh();
        if (err?.response && !prevReq?.sent) {
          prevReq.headers.authentication = newAccessToken;
          // add [sent] property for prevent retry request many times:
          prevReq.sent = true;
          // refresh token and add it to request:
          return axiosPrivateApi(prevReq);
        } else {
          return Promise.reject(err);
        }
      }
    );
    return () => {
      axiosPrivateApi.interceptors.response.eject(resIntercept);
      axiosPrivateApi.interceptors.request.eject(reqIntercept);
    };
  }, [auth, refresh]);
  return axiosPrivateApi;
}

export default usePrivateAxios;
