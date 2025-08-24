
import axios from "axios";
import { getSession } from "next-auth/react";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { cookies } from "next/headers";

// export const fetchWithAuth = async (url, options = {}) => {
//   const session = await getSession();
//   if (new Date(session.expires) < new Date()) {
//     redirect("/login");
//     // throw new Error("Token expired")
//   }
//   return fetch(url, {
//     ...options,
//     headers: {
//       ...options.headers,
//       Authorization: `Bearer ${
//         session.accessToken ?? session.accessEmailToken
//       }`,
//     },
//   });
// };

export const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  timeout: 10000,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3001",
  },
});
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session && session.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
  
    return config;
  },
  (error) => Promise.reject(error)
);
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error?.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshResponse = await api.get("http://localhost:3001/api/auth/refresh", {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Origin": ["http://localhost:3000", "http://localhost:3001"],
//           },
//           });

//         if (refreshResponse.status === 200) { // Check for successful response status
//           const data = refreshResponse.data; // Access data directly (no need for .json())

//           if (data && data.accessToken) { // Check if accessToken exists in the response
//             originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
//             return api(originalRequest); // Use the original 'api' instance
//           } else {
//             console.error("Invalid refresh token response:", data);
//             // Handle the error appropriately, e.g., redirect to login
//             return Promise.reject(new Error("Invalid refresh token response"));
//           }
//         } else {
//           console.error("Refresh token request failed:", refreshResponse.status, refreshResponse.data);
//           // Handle the error appropriately, e.g., redirect to login
//           return Promise.reject(new Error("Refresh token request failed"));
//         }
//       } catch (refreshError) {
//         console.error("Error during refresh token request:", refreshError);
//         // Handle the error appropriately, e.g., redirect to login
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error); // Re-throw the original error if it's not a 401
//   }
// );

