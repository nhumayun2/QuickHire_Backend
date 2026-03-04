import express from "express";
import jobRoute from "../route/jobRoute.js";
import applicationRoute from "../route/applicationRoute.js";

const router = express.Router();

router.use("/jobs", jobRoute);
router.use("/applications", applicationRoute);

export default router;
