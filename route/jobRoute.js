import express from "express";
import {
  getAllJobs,
  getJobById,
  createJob,
  deleteJob,
  getAdminJobs,
} from "../controller/jobController.js";
import { adminAuth } from "../middleware/authMiddleware.js";
import { validateJobInput } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/admin/myjobs", adminAuth, getAdminJobs);
router.get("/:id", getJobById);
router.post("/", adminAuth, validateJobInput, createJob);
router.delete("/:id", adminAuth, deleteJob);

export default router;
