import useAuth from "./useAuth";
import axiosApi from "../services/api";

function useRefreshToken() {
  const { setAuth } = useAuth();
  async function refresh() {
    const res = await axiosApi.get("auth/refresh", { withCredentials: true });
    setAuth((prev) => ({
      ...prev,
      ...res.data,
    }));
    return res.data.accessToken;
  }
  return refresh;
}

export default useRefreshToken;
