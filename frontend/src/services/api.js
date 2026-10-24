import axios from "axios";
import { config } from "@/config/env";

export const API_BASE_URL = config.apiBaseUrl;

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    timeout: 15000,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            error.message = "Could not reach the server. Check your connection and try again.";
        } else {
            error.message = error.response.data?.message || "The request could not be completed.";
        }
        return Promise.reject(error);
    }
);

export default api;
