import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [jobPost, setJobPost] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Clear token from storage
    toast.success("Logged out successfully!");
    navigate("/login"); // Redirect to login page
  };

  const handleJobPostUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setJobPost(file);
      toast.success("Job posting uploaded successfully!");
    } else {
      toast.error("Failed to upload job posting. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-500 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">Recruiter Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Welcome, Recruiter!</h2>
        <p className="mb-6 text-gray-700">
          Manage job postings, view applicants, and review resumes to find the best candidates.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder cards for dashboard sections */}
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-2">View Applicants</h3>
            <p className="text-gray-600">
              View and evaluate job applicants who have applied to your postings.
            </p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Manage Job Postings</h3>
            <p className="text-gray-600">
              Edit, update, or delete your current job postings.
            </p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Review Resumes</h3>
            <p className="text-gray-600">
              Review uploaded resumes to evaluate potential candidates.
            </p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Post New Job</h3>
            <p className="text-gray-600 mb-4">
              Upload a new job posting to find candidates for your job opening.
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleJobPostUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            {jobPost && <p className="text-green-600 mt-2">Uploaded: {jobPost.name}</p>}
          </div>
        </div>
      </main>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default RecruiterDashboard;
