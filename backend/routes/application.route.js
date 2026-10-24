import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isRecruiter from "../middlewares/isRecruiter.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
 
const router = express.Router();

router.route("/apply/:id").post(isAuthenticated, asyncHandler(applyJob));
router.route("/get").get(isAuthenticated, asyncHandler(getAppliedJobs));
router.route("/:id/applicants").get(isAuthenticated, isRecruiter, asyncHandler(getApplicants));
router.route("/status/:id/update").post(isAuthenticated, isRecruiter, asyncHandler(updateStatus));

export default router;
