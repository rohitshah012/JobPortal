import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri?.trim()) {
        throw new Error("MONGO_URI is not configured. Set it in backend/.env or the environment.");
    }

    await mongoose.connect(mongoUri);
    console.log("mongodb connected successfully");
};

export default connectDB;