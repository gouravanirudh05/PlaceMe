import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import axios from "axios";

const CodingPlatform = () => {
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("// Write your solution here");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");

  const languages = [
    { label: "C++", value: "cpp" },
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
    { label: "Java", value: "java" },
  ];

  // Fetch problem from Codeforces
  useEffect(() => {
    axios
      .get("https://codeforces.com/api/problemset.problems")
      .then((response) => {
        const problems = response.data.result.problems;
        setProblem(problems[0]); // Example: Select the first problem
      })
      .catch((error) => console.error("Error fetching problems:", error));
  }, []);

  const handleCodeChange = (value) => setCode(value);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setCode("// Write your solution here");
  };

  const handleSubmit = () => {
    console.log("Submitted Code:", code);
    console.log("Language:", language);
    setOutput("Example Output\nRuntime: 0.45s");
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="flex">
        {/* Problem Section */}
        <div className="w-1/3 bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-4">Problem</h2>
          {problem ? (
            <div>
              <h3 className="text-lg font-bold">{problem.name}</h3>
              <p className="text-sm text-gray-700 mb-4">
                Tags: {problem.tags.join(", ")}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Problem Statement:</strong> <br />
                (Simulated problem description as Codeforces API doesn't include full details.)
                <br />
                Solve the problem {problem.name} using the given tags {problem.tags.join(", ")}.
              </p>
            </div>
          ) : (
            <p>Loading problem...</p>
          )}
        </div>

        {/* Editor Section */}
        <div className="w-2/3 ml-4 bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Code Editor</h2>

          {/* Language Dropdown */}
          <div className="mb-4">
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">
              Select Language:
            </label>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Code Editor */}
          <MonacoEditor
            height="400px"
            language={language}
            value={code}
            onChange={handleCodeChange}
          />

          {/* Submit Button */}
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit
          </button>

          {/* Output Section */}
          {output && (
            <div className="mt-4 bg-gray-100 p-3 rounded">
              <h3 className="font-semibold">Output:</h3>
              <pre className="text-sm text-gray-800">{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodingPlatform;
