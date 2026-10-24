import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

const required = (name) => {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(`${name} is required. Add it to backend/.env or the environment.`);
    }
    return value;
};

const port = Number(process.env.PORT || 8000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be a valid port number between 1 and 65535.");
}

export const config = Object.freeze({
    nodeEnv: process.env.NODE_ENV || "development",
    port,
    clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
    mongoUri: required("MONGO_URI"),
    jwtSecret: required("SECRET_KEY"),
    cloudinary: Object.freeze({
        cloudName: process.env.CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY || process.env.API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET || process.env.API_SECRET,
    }),
});
