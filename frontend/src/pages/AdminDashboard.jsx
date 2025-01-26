import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("students"); // Control which section is active in the dashboard

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Clear token from storage
    toast.success("Logged out successfully!");
    navigate("/login"); // Redirect to login page
  };

  const handleManageStudents = () => {
    setActiveTab("students");
  };

  const handleManageRecruiters = () => {
    setActiveTab("recruiters");
  };

  const handleManageJobPostings = () => {
    setActiveTab("jobPostings");
  };

  const handleViewApplications = () => {
    setActiveTab("applications");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-700 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Welcome, Admin!</h2>
        <p className="mb-6 text-gray-700">
          Manage placement activities, users, and job postings, and monitor recruitment progress.
        </p>

        {/* Admin Dashboard Navigation */}
        <div className="mb-6">
          <button
            onClick={handleManageStudents}
            className={`${
              activeTab === "students" ? "bg-blue-500" : "bg-white"
            } text-lg text-blue-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-100 transition mr-4`}
          >
            Manage Students
          </button>
          <button
            onClick={handleManageRecruiters}
            className={`${
              activeTab === "recruiters" ? "bg-blue-500" : "bg-white"
            } text-lg text-blue-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-100 transition mr-4`}
          >
            Manage Recruiters
          </button>
          <button
            onClick={handleManageJobPostings}
            className={`${
              activeTab === "jobPostings" ? "bg-blue-500" : "bg-white"
            } text-lg text-blue-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-100 transition mr-4`}
          >
            Manage Job Postings
          </button>
          <button
            onClick={handleViewApplications}
            className={`${
              activeTab === "applications" ? "bg-blue-500" : "bg-white"
            } text-lg text-blue-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-100 transition`}
          >
            View Applications
          </button>
        </div>

        {/* Admin Dashboard Content */}
        {activeTab === "students" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Manage Students</h3>
            <p className="text-gray-700 mb-4">
              View and manage student profiles. Ensure that all students are ready for recruitment activities.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              View All Students
            </button>
          </div>
        )}

        {activeTab === "recruiters" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Manage Recruiters</h3>
            <p className="text-gray-700 mb-4">
              Approve and manage recruiter accounts. Ensure that only valid recruiters are listed.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              View All Recruiters
            </button>
          </div>
        )}

        {activeTab === "jobPostings" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Manage Job Postings</h3>
            <p className="text-gray-700 mb-4">
              View and approve job postings from recruiters. Ensure the postings are accurate and up-to-date.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              View All Job Postings
            </button>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">View Applications</h3>
            <p className="text-gray-700 mb-4">
              Track and manage the applications submitted by students. Monitor application statuses.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              View All Applications
            </button>
          </div>
        )}
      </main>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
