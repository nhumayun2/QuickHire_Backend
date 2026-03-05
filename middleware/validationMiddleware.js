export const validateJobInput = (req, res, next) => {
  const {
    title,
    company,
    location,
    category,
    description,
    responsibilities,
    requirements,
  } = req.body;

  const errors = [];

  if (!title || typeof title !== "string" || title.trim() === "") {
    errors.push("A valid job title is required.");
  }

  if (!company || typeof company !== "string" || company.trim() === "") {
    errors.push("Company name is required.");
  }

  if (!location || typeof location !== "string" || location.trim() === "") {
    errors.push("Job location is required.");
  }

  if (!category || typeof category !== "string" || category.trim() === "") {
    errors.push("Job category is required.");
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    errors.push("Job description is required.");
  }

  if (!Array.isArray(responsibilities) || responsibilities.length === 0) {
    errors.push("Responsibilities must be a non-empty array.");
  }

  if (!Array.isArray(requirements) || requirements.length === 0) {
    errors.push("Requirements must be a non-empty array.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export const validateApplicationInput = (req, res, next) => {
  const { email, resumeLink } = req.body;
  const errors = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Please provide a properly formatted email address.");
  }

  const urlRegex =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
  if (!resumeLink || !urlRegex.test(resumeLink)) {
    errors.push("Please provide a valid URL for the resume link.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
