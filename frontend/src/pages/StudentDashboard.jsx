import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Clear token from storage
    toast.success("Logged out successfully!");
    navigate("/login"); // Redirect to login page
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResume(file);
      toast.success("Resume uploaded successfully!");
    } else {
      toast.error("Failed to upload resume. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">Student Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Welcome, Student!</h2>
        <p className="mb-6 text-gray-700">
          Manage your job applications, update your profile, and upload your resume to stand out to recruiters.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder cards for dashboard sections */}
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-2">View Job Postings</h3>
            <p className="text-gray-600">
              Explore and apply to job opportunities posted by recruiters.
            </p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Update Your Profile</h3>
            <p className="text-gray-600">
              Keep your profile up-to-date for recruiters to find you.
            </p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Application Status</h3>
            <p className="text-gray-600">
              Track the status of your job applications in real-time.
            </p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Upload Resume</h3>
            <p className="text-gray-600 mb-4">
              Upload your resume to make it easier for recruiters to review your qualifications.
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {resume && <p className="text-green-600 mt-2">Uploaded: {resume.name}</p>}
          </div>
        </div>
      </main>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default StudentDashboard;