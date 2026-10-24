import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import { rateLimit } from "express-rate-limit";
import { config } from "./config/env.js";
import apiRoutes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use("/api", rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        message: "Too many requests from this IP, please try again after 15 minutes.",
        success: false,
    },
    standardHeaders: true,
    legacyHeaders: false,
}));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(mongoSanitize());
app.use(cookieParser());
app.use(cors({
    origin: config.clientUrl,
    credentials: true,
}));

app.use("/api/v1", apiRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
