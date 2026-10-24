import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import { rateLimit } from "express-rate-limit";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

const app = express();

// Security HTTP headers
app.use(helmet({
    contentSecurityPolicy: false, // Let dev browser run scripts comfortably without CSP blocks
}));

// Sanitize MongoDB operators to prevent NoSQL injection
app.use(mongoSanitize());

// Rate Limiting to prevent Brute-Force/DDoS
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: {
        message: "Too many requests from this IP, please try again after 15 minutes.",
        success: false
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use("/api", limiter);

// middleware
app.use(express.json({ limit: '10kb' })); // Prevents large payload payload-flood attacks
app.use(express.urlencoded({extended:true, limit: '10kb'}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);



const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exitCode = 1;
});