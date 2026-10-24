import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isRecruiter from "../middlewares/isRecruiter.js";
import { getCompany, getCompanyById, registerCompany, updateCompany, deleteCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, isRecruiter, asyncHandler(registerCompany));
router.route("/get").get(isAuthenticated, asyncHandler(getCompany));
router.route("/get/:id").get(isAuthenticated, asyncHandler(getCompanyById));
router.route("/update/:id").put(isAuthenticated, isRecruiter, singleUpload, asyncHandler(updateCompany));
router.route("/delete/:id").delete(isAuthenticated, isRecruiter, asyncHandler(deleteCompany));

export default router;
