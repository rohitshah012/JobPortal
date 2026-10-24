import mongoose from "mongoose";
import { config } from "../config/env.js";

const connectDB = async () => {
    await mongoose.connect(config.mongoUri);
    console.log("mongodb connected successfully");
};

export default connectDB;