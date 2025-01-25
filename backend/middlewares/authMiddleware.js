import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import College from "../models/College.js";
import Recruiter from "../models/Recruiter.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// ------------------------------------
// AUTHENTICATION MIDDLEWARE
// ------------------------------------

// Verify Token for Any User
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided!" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user details to request
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token!" });
  }
};

// ------------------------------------
// STUDENT AUTHENTICATION
// ------------------------------------
export const studentAuth = async (req, res, next) => {
  try {
    await verifyToken(req, res, async () => {
      const student = await Student.findById(req.user.id);
      if (!student) return res.status(404).json({ error: "Student not found!" });
      if (req.user.role !== "student")
        return res.status(403).json({ error: "Access denied for non-students!" });

      req.student = student; // Attach student data to request
      next();
    });
  } catch (error) {
    res.status(500).json({ error: "Student authentication failed!" });
  }
};

// ------------------------------------
// COLLEGE AUTHENTICATION
// ------------------------------------
export const collegeAuth = async (req, res, next) => {
  try {
    await verifyToken(req, res, async () => {
      const college = await College.findById(req.user.id);
      if (!college) return res.status(404).json({ error: "College not found!" });
      if (req.user.role !== "college")
        return res.status(403).json({ error: "Access denied for non-colleges!" });

      req.college = college; // Attach college data to request
      next();
    });
  } catch (error) {
    res.status(500).json({ error: "College authentication failed!" });
  }
};

// ------------------------------------
// RECRUITER AUTHENTICATION
// ------------------------------------
export const recruiterAuth = async (req, res, next) => {
  try {
    await verifyToken(req, res, async () => {
      const recruiter = await Recruiter.findById(req.user.id);
      if (!recruiter) return res.status(404).json({ error: "Recruiter not found!" });
      if (req.user.role !== "recruiter")
        return res.status(403).json({ error: "Access denied for non-recruiters!" });

      req.recruiter = recruiter; // Attach recruiter data to request
      next();
    });
  } catch (error) {
    res.status(500).json({ error: "Recruiter authentication failed!" });
  }
};
