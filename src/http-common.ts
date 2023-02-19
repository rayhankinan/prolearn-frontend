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
      config.headers["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc2NzY2MzY5LCJleHAiOjE2NzY3Njk5Njl9.RFGVF5k_fnRs1PSgkQ6dIefNbN6ZM6KYSCaxaVshfsQ`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default http;