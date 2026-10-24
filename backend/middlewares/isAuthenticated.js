import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = jwt.verify(token, config.jwtSecret);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        req.id = decode.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token.",
            success: false
        });
    }
}
export default isAuthenticated;