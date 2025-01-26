import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // Students in this college
  recruiters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recruiter" }], // Recruiters connected
  placementOfficer: {
    name: { type: String},
    email: { type: String },
    phone: { type: String },
  },
});

export default mongoose.model("College", collegeSchema);
