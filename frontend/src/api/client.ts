import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // Redirect to signin on unauthorized
      if (typeof window !== 'undefined') {
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);

export default api; 