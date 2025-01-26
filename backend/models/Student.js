import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  college: { type: mongoose.Schema.Types.ObjectId, ref: "College", },
  skills: { type: [String] }, // Example: ["JavaScript", "Python"]
  cgpa: { type: Number },
  resume: {
    data: Buffer,
    contentType: String,
    name: String,
  }, // Resume file URL or path
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }], // Jobs applied
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" }
});

export default mongoose.model("Student", studentSchema);
