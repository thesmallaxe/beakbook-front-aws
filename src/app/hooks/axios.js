import axios from "axios";
import { HttpConfig } from "../constants/config/HttpConfig";
import { notifyError } from "../services/ToastHelper";

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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      window.location.href = "/logout";
    }

    if (error.response?.data?.message) {
      notifyError(error.response?.data?.message);
    }
    return error;
  }
);

export default axiosInstance;
