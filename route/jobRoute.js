import express from "express";
import {
  getAllJobs,
  getJobById,
  createJob,
  deleteJob,
} from "../controller/jobController.js";
import { adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post("/", adminAuth, createJob);
router.delete("/:id", adminAuth, deleteJob);

export default router;
