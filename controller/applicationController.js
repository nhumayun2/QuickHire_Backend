import Application from "../model/Application.js";
import Job from "../model/Job.js";

export const submitApplication = async (req, res, next) => {
  try {
    const { job_id, name, email, resume_link, cover_note } = req.body;

    if (!job_id || !name || !email || !resume_link) {
      return res
        .status(400)
        .json({ message: "Job ID, name, email, and resume link are required" });
    }

    const jobExists = await Job.findById(job_id);

    if (!jobExists) {
      return res.status(404).json({ message: "Job not found" });
    }

    const newApplication = new Application({
      job_id,
      name,
      email,
      resume_link,
      cover_note,
    });

    const savedApplication = await newApplication.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application: savedApplication,
    });
  } catch (error) {
    next(error);
  }
};
