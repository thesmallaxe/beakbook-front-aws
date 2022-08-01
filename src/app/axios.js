import axios from "axios";
import { HttpConfig } from "./constants/config/HttpConfig";

const instance = axios.create({
  baseURL: HttpConfig.domain,
});

let AUTH_TOKEN = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : JSON.parse(sessionStorage.getItem("token")) ?? null;

if (AUTH_TOKEN) {
  instance.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
}

export default instance;
