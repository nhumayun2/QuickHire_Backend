import express from "express";
import jobRoute from "../route/jobRoute.js";
import applicationRoute from "../route/applicationRoute.js";
import authRoutes from "../route/authRoute.js";

const router = express.Router();

router.use("/jobs", jobRoute);
router.use("/applications", applicationRoute);
router.use("/auth", authRoutes);

export default router;
