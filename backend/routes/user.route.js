import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { login, logout, register, updateProfile, saveJob, getSavedJobs } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
 
const router = express.Router();

router.route("/register").post(singleUpload, asyncHandler(register));
router.route("/login").post(asyncHandler(login));
router.route("/logout").get(asyncHandler(logout));
router.route("/profile/update").post(isAuthenticated, singleUpload, asyncHandler(updateProfile));
router.route("/saved").get(isAuthenticated, asyncHandler(getSavedJobs));
router.route("/save/:id").post(isAuthenticated, asyncHandler(saveJob));

export default router;
