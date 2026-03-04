import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^\S+@\S+\.\S+$/,
    },
    resume_link: {
      type: String,
      required: true,
      trim: true,
      match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
    },
    cover_note: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Application", applicationSchema);
