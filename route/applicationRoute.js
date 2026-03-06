import express from "express";
import {
  submitApplication,
  getApplications,
} from "../controller/applicationController.js";
import { validateApplicationInput } from "../middleware/validationMiddleware.js";
import { adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", validateApplicationInput, submitApplication);

router.get("/", adminAuth, getApplications);

export default router;
