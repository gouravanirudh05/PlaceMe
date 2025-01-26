import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://codeforces.com/api/recentActions?maxCount=20"
        );
        const data = await response.json();

        if (data.status === "OK") {
          const blogEntries = data.result.filter((entry) => entry.blogEntry);
          setBlogs(blogEntries);
          setLoading(false);
        } else {
          throw new Error("Failed to fetch blogs");
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow p-6">
        <h1 className="text-3xl font-bold text-center">Recent Blogs</h1>
      </header>
      <main className="p-8 max-w-6xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">Error: {error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No blogs found.</p>
        ) : (
          <section className="grid gap-8 md:grid-cols-2">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="bg-white shadow rounded p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {blog.blogEntry.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  <strong>Author:</strong> {blog.blogEntry.authorHandle}
                </p>
                <p className="text-gray-600">
                  <strong>Creation Time:</strong>{" "}
                  {new Date(blog.blogEntry.creationTimeSeconds * 1000).toLocaleString()}
                </p>
                <a
                  href={`https://codeforces.com/blog/entry/${blog.blogEntry.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-4 block"
                >
                  Read on Codeforces
                </a>
              </div>
            ))}
          </section>
        )}
        <div className="flex justify-center mt-12">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
};

export default Blogs;
