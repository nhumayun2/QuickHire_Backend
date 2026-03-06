import Job from "../model/Job.js";

export const getAllJobs = async (req, res, next) => {
  try {
    const { search, category, location } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

export const getAdminJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      company,
      location,
      category,
      description,
      responsibilities,
      requirements,
    } = req.body;

    if (
      !title ||
      !company ||
      !location ||
      !category ||
      !description ||
      !responsibilities ||
      !requirements
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newJob = new Job({
      title,
      company,
      location,
      category,
      description,
      responsibilities,
      requirements,
      createdBy: req.user.id,
    });
    const savedJob = await newJob.save();

    res.status(201).json(savedJob);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this job" });
    }

    await job.deleteOne();

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
};
