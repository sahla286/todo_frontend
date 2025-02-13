import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshAccessToken = async () => {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) {
        console.error("No refresh token found.");
        return null;
    }

    try {
        const response = await axios.post(`${API_BASE_URL}task/refresh/`, { refresh });

        if (response.status === 200) {
            const newAccessToken = response.data.access;
            localStorage.setItem("access_token", newAccessToken);
            console.log("Token refreshed!");
            return newAccessToken;
        }
    } catch (error) {
        console.error("Token refresh failed:", error.response?.data || error.message);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return null;
    }
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,  
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export const registerUser = (userData) => api.post("user/", userData);
export const loginUser = (userData) => api.post("tokenpair/", userData);
export const getTasks = () => api.get("task/tasks/");
export const fetchTasks = () => api.get("task/tasks/");
export const createTask = (task) => api.post("task/tasks/", task);
export const updateTask = (id, task) => api.put(`task/tasks/${id}/`, task);
export const deleteTask = (id) => api.delete(`task/tasks/${id}/`);
export const fetchCalendarTasks = () => api.get("task/calendar-tasks/");

export default api;
