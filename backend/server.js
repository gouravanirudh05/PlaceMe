import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import College from "./models/College.js";
import Student from "./models/Student.js";
import Recruiter from "./models/Recruiter.js";
import Application from "./models/Application.js";
import Job from "./models/Job.js";
import multer from "multer";
import axios from "axios";
import { studentAuth, recruiterAuth, collegeAuth, verifyToken } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage });


// Your Judge0 API keys
const JUDGE0_API_BASE = "https://judge0-ce.p.rapidapi.com";
const JUDGE0_API_HEADERS = {
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  "X-RapidAPI-Key": "4fe2083015mshec311dc12f5ee39p11ebddjsn0d0e81583475", // Replace with your RapidAPI key
};

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// ------------------------------------
// SIGNUP ROUTES
// ------------------------------------

// College signup
app.post("/api/college/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingCollege = await College.findOne({ email });
    if (existingCollege) return res.status(400).json({ error: "Email already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const college = await College.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "College registered successfully!" });
  } catch (error) {
    res.status(400).json({ error: "College registration failed!" });
  }
});

// Student signup
app.post("/api/student/signup", async (req, res) => {
  const { name, email, password} = req.body;
  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) return res.status(400).json({ error: "Email already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = await Student.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "Student registered successfully!" });
  } catch (error) {
    res.status(400).json({ error: "Student registration failed!" });
  }
});

// Recruiter signup
app.post("/api/recruiter/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) return res.status(400).json({ error: "Email already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const recruiter = await Recruiter.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "Recruiter registered successfully!" });
  } catch (error) {
    res.status(400).json({ error: "Recruiter registration failed!" });
  }
});

// ------------------------------------
// LOGIN ROUTES
// ------------------------------------
app.post("/api/login", async (req, res) => {
  const { email, password, role } = req.body; // role: "student", "college", "recruiter"

  try {
    let user;
    if (role === "student") user = await Student.findOne({ email });
    else if (role === "college") user = await College.findOne({ email });
    else if (role === "recruiter") user = await Recruiter.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials!" });

    const token = jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ token, user: { id: user._id, name: user.name, role } });
  } catch (error) {
    res.status(500).json({ error: "Login failed!" });
  }
});

// ------------------------------------
// JOB ROUTES
// ------------------------------------

// Recruiter posts a job
app.post("/api/createJob", recruiterAuth, async (req, res) => {
  const { title, company, description, eligibility, collegeId } = req.body;
  try {
    const job = await Job.create({ title, company, description, eligibility, postedBy: req.recruiter._id, collegeId });
    res.status(201).json({ message: "Job posted successfully!" });
  } catch (error) {
    res.status(400).json({ error: "Failed to post job!" });
  }
});

app.post("/api/place", recruiterAuth, async (req, res) => {
    const { jobId, studentId } = req.body;
    try {
      const student = await Student.findById(studentId);
      student.updateOne({jobId: jobId});
      res.status(201).json({ message: "Student places successfully!" });
    } catch (error) {
      res.status(400).json({ error: "Failed to place student!" });
    }
  });

// Get all jobs (for students)
app.get("/api/jobs", studentAuth, async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs!" });
  }
});

// Student applies for a job
app.post("/api/apply", studentAuth, async (req, res) => {
  const { jobId } = req.body;
  try {
    const application = await Application.create({ job: jobId, student: req.student._id });
    res.status(201).json({ message: "Applied successfully!" });
  } catch (error) {
    res.status(400).json({ error: "Failed to apply for the job!" });
  }
});

// Get applications for a job (for recruiters)
app.get("/api/applications/:jobId", recruiterAuth, async (req, res) => {
  const { jobId } = req.params;
  try {
    const applications = await Application.find({ job: jobId }).populate("student", "name email");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications!" });
  }
});

app.post("/submit", async (req, res) => {
  const { source_code, language_id, stdin } = req.body;

  if (!source_code || !language_id || stdin === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Submit code to Judge0
    const submissionResponse = await axios.post(
      `${JUDGE0_API_BASE}/submissions`,
      {
        source_code,
        language_id,
        stdin,
      },
      { headers: { ...JUDGE0_API_HEADERS, "Content-Type": "application/json" } }
    );

    const { token } = submissionResponse.data;

    // Polling for the result
    const getResult = async () => {
      const resultResponse = await axios.get(
        `${JUDGE0_API_BASE}/submissions/${token}`,
        { headers: JUDGE0_API_HEADERS }
      );

      if (resultResponse.data.status.id <= 2) {
        // Status 1: In Queue, 2: Processing
        return new Promise((resolve) =>
          setTimeout(() => resolve(getResult()), 1000)
        );
      }

      return resultResponse.data;
    };

    const result = await getResult();

    // Return the result
    return res.json({
      stdout: result.stdout,
      stderr: result.stderr,
      compile_output: result.compile_output,
      time: result.time,
      memory: result.memory,
      status: result.status.description,
    });
  } catch (error) {
    console.error("Error processing submission:", error);
    return res.status(500).json({ error: "Failed to process submission" });
  }
});

app.post("/api/student/upload-resume", studentAuth, upload.single("resume"), async (req, res) => {
  try {
    const studentId = req.student._id; // Assuming you have middleware to decode JWT and attach `req.user`
    const resume = req.file;

    if (!resume) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Update student document with resume data
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    // Store resume data as a buffer
    student.resume = {
      data: resume.buffer,
      contentType: resume.mimetype,
      name: resume.originalname,
    };

    await student.save();

    res.status(200).json({ message: "Resume uploaded successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// ------------------------------------
// START SERVER
// ------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
