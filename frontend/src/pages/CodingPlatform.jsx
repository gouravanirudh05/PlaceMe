import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import axios from "axios";

const CodingPlatform = () => {
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("// Write your solution here");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState(""); // For custom input

  const languages = [
    { label: "C++", value: "cpp", id: 54 },
    { label: "JavaScript", value: "js", id: 63 },
    { label: "Python", value: "py", id: 71 },
    { label: "Java", value: "java", id: 62 },
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

  const handleSubmit = async () => {
    try {
      const selectedLang = languages.find((lang) => lang.value === language);

      const response = await axios.post('https://api.codex.jaagrav.in', {
        code: code,
        language: selectedLang.value,
        input: input,
      });

      const { output, error } = response.data;

      setOutput(
        output
          ? `Output:\n${output}`
          : error
          ? `Error:\n${error}`
          : "None"
      );
    } catch (error) {
      console.error("Error submitting code:", error);
      setOutput("Failed to execute the code. Please try again.");
    }
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

          {/* Input Section */}
          <div className="mt-4">
            <label htmlFor="input" className="block text-sm font-medium text-gray-700">
              Custom Input:
            </label>
            <textarea
              id="input"
              rows="4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter input for the code"
            />
          </div>

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
