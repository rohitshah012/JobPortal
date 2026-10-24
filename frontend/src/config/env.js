const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
    || import.meta.env.VITE_API_END_POINT
    || "http://localhost:8000/api/v1";

export const config = Object.freeze({
    apiBaseUrl: apiBaseUrl.replace(/\/+$/, ""),
});
