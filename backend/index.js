import app from "./app.js";
import { config } from "./config/env.js";
import connectDB from "./utils/db.js";

const startServer = async () => {
    await connectDB();
    app.listen(config.port, () => {
        console.log(`Server running at port ${config.port}`);
    });
};

startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exitCode = 1;
});