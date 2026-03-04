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
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (location) {
      query.location = { $regex: new RegExp(`^${location}$`, "i") };
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

export const createJob = async (req, res, next) => {
  try {
    const { title, company, location, category, description } = req.body;

    if (!title || !company || !location || !category || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newJob = new Job({ title, company, location, category, description });
    const savedJob = await newJob.save();

    res.status(201).json(savedJob);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
};
