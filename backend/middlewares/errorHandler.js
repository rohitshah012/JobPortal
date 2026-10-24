export const notFoundHandler = (req, res, next) => {
    const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

export const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    let statusCode = error.statusCode || error.status || 500;
    let message = error.message || "Internal server error.";

    if (error.type === "entity.parse.failed") {
        statusCode = 400;
        message = "Request body contains invalid JSON.";
    } else if (error.name === "MulterError") {
        statusCode = 400;
        message = error.message;
    } else if (error.name === "ValidationError" || error.name === "CastError") {
        statusCode = 400;
        message = error.message;
    } else if (error.code === 11000) {
        statusCode = 409;
        message = "A record with this value already exists.";
    } else if (statusCode >= 500) {
        console.error("API error:", error);
        message = "Internal server error.";
    }

    return res.status(statusCode).json({ success: false, message });
};
