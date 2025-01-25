import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  college: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true },
  skills: { type: [String], required: false }, // Example: ["JavaScript", "Python"]
  cgpa: { type: Number, required: true },
  resume: { type: String, required: false }, // Resume file URL or path
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }], // Jobs applied
});

export default mongoose.model("Student", studentSchema);
