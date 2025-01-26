import React, { useState, useEffect } from "react";
import axios from "axios";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs from TheirStack API
  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = "https://api.theirstack.com/v1/jobs/search";
      const apiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnb3VyYXNyaTA1MDJAZ21haWwuY29tIiwicGVybWlzc2lvbnMiOiJ1c2VyIn0.sa8jnWFhZzb_0wD870mOGQByLcVLYaDHOfD0zRP8q4w";

      const requestBody = {
        page: 0,
        limit: 10,
        posted_at_max_age_days: 15,
        order_by: [
          {
            desc: true,
            field: "date_posted",
          },
        ],
        job_country_code_or: ["IN"],
        include_total_results: false,
        blur_company_data: false,
      };

      try {
        const response = await axios.post(apiUrl, requestBody, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiToken}`,
          },
        });

        setJobs(response.data); // Update this based on the actual structure of the response
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch jobs. Please try again later.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="bg-blue-600 text-white py-4 px-8 shadow-md">
        <h1 className="text-3xl font-bold text-center">Job Listings</h1>
      </header>

      <main className="max-w-6xl mx-auto py-8">
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {job.title}
                </h2>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <p className="text-sm text-gray-500 mb-4">Location: {job.location}</p>
                <p className="text-gray-700 mb-4">
                  {job.description.length > 100
                    ? job.description.substring(0, 100) + "..."
                    : job.description}
                </p>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">No jobs available at the moment.</div>
        )}
      </main>
    </div>
  );
};

export default JobsPage;
