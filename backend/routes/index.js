import express from "express";
import userRoute from "./user.route.js";
import companyRoute from "./company.route.js";
import jobRoute from "./job.route.js";
import applicationRoute from "./application.route.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/company", companyRoute);
router.use("/job", jobRoute);
router.use("/application", applicationRoute);

export default router;
