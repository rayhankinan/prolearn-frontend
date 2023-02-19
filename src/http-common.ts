import axios from "axios";

const API_URL = "http://localhost:80/api";

const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

// Add a request interceptor
http.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default http;