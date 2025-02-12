// import axios from "axios";

// const API_BASE_URL = "http://127.0.0.1:8000/";

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const registerUser = (userData) => api.post("task/register/", userData);
// export const loginUser = (userData) => api.post("task/login/", userData);
// export const getTasks = () => api.get("task/tasks/");
// // export const fetchTasks = (token) => api.get("task/tasks/", { headers: { Authorization: `Bearer ${token}` } });
// // export const createTask = (task, token) => api.post("task/tasks/", task, { headers: { Authorization: `Bearer ${token}` } });
// // export const updateTask = (id, task, token) => api.put(`task/tasks/${id}/`, task, { headers: { Authorization: `Bearer ${token}` } });
// // export const deleteTask = (id, token) => api.delete(`task/tasks/${id}/`, { headers: { Authorization: `Bearer ${token}` } });
// // export const fetchCalendarTasks = (token) => api.get("task/calendar-tasks/", { headers: { Authorization: `Bearer ${token}` } });
// export const fetchTasks = (token) => api.get("task/tasks/", { headers: { Authorization: `Bearer ${token}` } });
// // export const createTask = (task, token) => api.post("task/tasks/", task, { headers: { Authorization: `Bearer ${token}` } });
// export const updateTask = (id, task, token) => api.put(`task/tasks/${id}/`, task, { headers: { Authorization: `Bearer ${token}` } });
// export const deleteTask = (id, token) => api.delete(`task/tasks/${id}/`, { headers: { Authorization: `Bearer ${token}` } });
// export const fetchCalendarTasks = (token) => api.get("task/calendar-tasks/", { headers: { Authorization: `Bearer ${token}` } });

// // export const logoutUser = (token) =>
// //     api.post("task/logout/", { refresh: token }).catch((error) => {
// //       console.error("Logout failed:", error);
// //       throw error;
// //     });

// export const logoutUser = () => {
//     const refresh = localStorage.getItem("refresh_token");  
//     if (!refresh) {
//         console.error("No refresh token found.");
//         return Promise.reject(new Error("No refresh token found."));
//     }
//     return api.post("task/logout/", { refresh: refresh })  // Ensure correct key
//         .then(() => {
//             localStorage.removeItem("access_token");
//             localStorage.removeItem("refresh_token");
//         })
//         .catch(error => {
//             console.error("Logout failed:", error.response?.data || error.message);
//             throw error;
//         });
// };

// // export const logoutUser = () => api.post("task/logout/", { refresh: localStorage.getItem("refresh_token") });

// // export const createTask = (task) => {
// //     const token = localStorage.getItem("access_token");  // ✅ Use correct key
// //     return api.post("task/tasks/", task, {
// //         headers: { Authorization: `Bearer ${token}` }
// //     });
// // };

// export const createTask = (task) => {
//     const token = localStorage.getItem("access_token");
    
//     if (!token) {
//         console.error("No access token found.");
//         return Promise.reject(new Error("No access token found."));
//     }

//     return api.post("task/tasks/", task, {
//         headers: { Authorization: `Bearer ${token}` }
//     });
// };


// const refreshAccessToken = async () => {
//     const refresh = localStorage.getItem("refresh_token");
//     if (!refresh) {
//         console.error("No refresh token found.");
//         return;
//     }

//     try {
//         const response = await fetch("http://127.0.0.1:8000/task/refresh/", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ refresh }),
//         });

//         if (!response.ok) {
//             throw new Error("Failed to refresh token");
//         }

//         const data = await response.json();
//         localStorage.setItem("access_token", data.access);
//         console.log("Token refreshed!");
//     } catch (error) {
//         console.error("Token refresh failed:", error);
//     }
// };


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

// ✅ Add Axios response interceptor (Handle Token Expiry)
api.interceptors.response.use(
  (response) => response,  // Return response if no error
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);  // Retry the request with the new token
      }
    }

    return Promise.reject(error);
  }
);

// ✅ API functions using the axios instance
export const registerUser = (userData) => api.post("user/", userData);
export const loginUser = (userData) => api.post("tokenpair/", userData);
export const getTasks = () => api.get("task/tasks/");
export const fetchTasks = () => api.get("task/tasks/");
export const createTask = (task) => api.post("task/tasks/", task);
// export const createTask = (task) => {
//     const token = localStorage.getItem("access_token");
    
//     if (!token) {
//         console.error("No access token found.");
//         return Promise.reject(new Error("No access token found."));
//     }

//     return api.post("task/tasks/", task, {
//         headers: { Authorization: `Bearer ${token}` }
//     });
// };

export const updateTask = (id, task) => api.put(`task/tasks/${id}/`, task);
export const deleteTask = (id) => api.delete(`task/tasks/${id}/`);
export const fetchCalendarTasks = () => api.get("task/calendar-tasks/");

// ✅ Logout function (Clears tokens)
export const logoutUser = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return api.post("task/logout/", { refresh: localStorage.getItem("refresh_token") }).catch((error) => {
        console.error("Logout failed:", error.response?.data || error.message);
        throw error;
    });
};

export default api;
