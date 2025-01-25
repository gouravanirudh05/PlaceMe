import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  eligibility: { type: String, required: true },
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College" }
});

export default mongoose.model("Job", jobSchema);
