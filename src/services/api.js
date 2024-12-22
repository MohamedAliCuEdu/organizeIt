import axios from "axios";

// const BASE_URL = "https://organize-it-api.vercel.app/";
const BASE_URL = "http://localhost:4000";

const axiosApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivateApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosApi;
