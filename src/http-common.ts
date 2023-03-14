import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const http = axios.create({
  baseURL: publicRuntimeConfig.apiURL,
  headers: {},
});

console.log(publicRuntimeConfig.apiURL);

// Add a request interceptor
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
