import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company: { type: String },
  jobPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }], // Jobs created by this recruiter
  connectedColleges: [{ type: mongoose.Schema.Types.ObjectId, ref: "College" }], // Colleges they work with
});

export default mongoose.model("Recruiter", recruiterSchema);
