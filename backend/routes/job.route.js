import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isRecruiter from "../middlewares/isRecruiter.js";
import { getAdminJobs, getAllJobs, getJobById, postJob, updateJob, deleteJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, isRecruiter, asyncHandler(postJob));
router.route("/get").get(asyncHandler(getAllJobs));
router.route("/getadminjobs").get(isAuthenticated, isRecruiter, asyncHandler(getAdminJobs));
router.route("/get/:id").get(asyncHandler(getJobById));
router.route("/update/:id").put(isAuthenticated, isRecruiter, asyncHandler(updateJob));
router.route("/delete/:id").delete(isAuthenticated, isRecruiter, asyncHandler(deleteJob));

export default router;
