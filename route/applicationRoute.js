import express from "express";
import { submitApplication } from "../controller/applicationController.js";

const router = express.Router();

router.post("/", submitApplication);
router.get("/", getApplications);

export default router;
