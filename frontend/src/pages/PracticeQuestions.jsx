import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PracticeQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://codeforces.com/api/problemset.problems"
        );
        const data = await response.json();

        if (data.status === "OK") {
          setQuestions(data.result.problems.slice(0, 20)); // Fetch the first 20 questions
          setLoading(false);
        } else {
          throw new Error("Failed to fetch problems");
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow p-6">
        <h1 className="text-3xl font-bold text-center">Practice Questions</h1>
      </header>
      <main className="p-8 max-w-6xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading questions...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">Error: {error}</p>
        ) : (
          <section className="grid gap-8 md:grid-cols-2">
            {questions.map((question, index) => (
              <div
                key={index}
                className="bg-white shadow rounded p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {question.name}
                </h2>
                <p className="text-gray-600">
                  <strong>Rating:</strong> {question.rating || "Unrated"}
                </p>
                <p className="text-gray-600">
                  <strong>Tags:</strong> {question.tags.join(", ") || "None"}
                </p>
                <a
                  href={`https://codeforces.com/problemset/problem/${question.contestId}/${question.index}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-4 block"
                >
                  Solve on Codeforces
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

export default PracticeQuestions;
