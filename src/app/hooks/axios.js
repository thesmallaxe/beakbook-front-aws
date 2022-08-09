import axios from "axios";
import { HttpConfig } from "../constants/config/HttpConfig";

let getToken = () => {
  return localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : JSON.parse(sessionStorage.getItem("token")) ?? null;
};

const axiosInstance = axios.create({
  baseURL: HttpConfig.domain,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    const auth = token ? `Bearer ${token}` : "";
    config.headers.common["Authorization"] = auth;
    return config;
  },
  (error) => Promise.reject(error)
);

export const config = {
  headers: {
    ContentType: "application/json",
    Authorization: "Bearer " + getToken(),
  },
};

export default axiosInstance;
