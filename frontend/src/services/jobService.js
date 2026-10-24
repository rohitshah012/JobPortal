import api from "./api";

export const getAllJobs = async (keyword, signal) => {
    const response = await api.get("/job/get", {
        params: { keyword },
        signal,
    });

    return response.data.jobs;
};
