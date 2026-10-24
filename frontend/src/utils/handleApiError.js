import { toast } from "sonner";

export const notifyApiError = (error, fallback = "The request could not be completed.") => {
    const message = error instanceof Error ? error.message : fallback;
    toast.error(message || fallback);
};
