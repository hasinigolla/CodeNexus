// Replace your entire src/pages/CodeGen.jsx with this code
import { logout } from "../utils/logout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeGen() {
  const [problem, setProblem] = useState("");
  const [language, setLanguage] = useState("Python");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Custom input states
  const [customInput, setCustomInput] = useState("");
  const [customOutput, setCustomOutput] = useState("");
  const [testCasesLoading, setTestCasesLoading] = useState(false);
  const [customRunLoading, setCustomRunLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };


  // Solve Problem
  const solveProblem = async () => {
    if (!problem.trim()) {
      alert("Please enter a problem statement.");
      return;
    }

    setLoading(true);
    setResult(null);
    setCustomOutput("");

    try {
      const response = await fetch("http://127.0.0.1:8000/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problem_statement: problem,
          language,
        }),
      });

      const data = await response.json();
      console.log("SOLVE RESPONSE:", data);
      setResult(data);
    } catch (error) {
      setResult({
        error:
          "Failed to connect to backend. Make sure FastAPI is running on port 8000.",
      });
    }

    setLoading(false);
  };

  // Generate Test Cases
  const generateTestCases = async () => {
    if (!problem.trim()) {
      alert("Please enter a problem statement.");
      return;
    }

    setTestCasesLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/generate-testcases",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            problem_statement: problem,
          }),
        }
      );

      const data = await response.json();

      setResult((prev) => ({
        ...(prev || {}),
        test_cases: data.test_cases,
      }));
    } catch (error) {
      alert("Failed to generate test cases.");
    }

    setTestCasesLoading(false);
  };

  // Extract Code
  const extractCode = (text) => {
    if (!text) return "";
    const match = text.match(/```[\w+#]*\n([\s\S]*?)```/);
    return match ? match[1].trim() : "Code not found.";
  };

  // Remove Comments
  const removeComments = (code) => {
    if (!code) return "";

    return code
      .split("\n")
      .filter((line) => {
        const t = line.trim();
        return (
          !t.startsWith("#") &&
          !t.startsWith("//") &&
          !t.startsWith("/*") &&
          !t.startsWith("*") &&
          !t.startsWith("*/")
        );
      })
      .join("\n")
      .trim();
  };

  // Get Generated Code
  const getGeneratedCode = () => {
  // 1. Prefer the code field returned by the backend
  if (result?.code && result.code.trim()) {
  return result.code.trim();
}

  // 2. If backend returned raw markdown code, extract it
  if (result?.solution && result.solution.trim()) {
    const extracted = extractCode(result.solution);
    if (extracted && extracted !== "Code not found.") {
      return removeComments(extracted);
    }
  }

  // 3. No code available
  return "";
};

  // Copy Code
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(getGeneratedCode());
      alert("Code copied to clipboard!");
    } catch {
      alert("Failed to copy code.");
    }
  };

  // Download Code
  const downloadCode = () => {
    const code = getGeneratedCode();

    if (!code || code === "Code not found.") {
      alert("No code available to download.");
      return;
    }

    const extensionMap = {
      Python: "py",
      Java: "java",
      "C++": "cpp",
      C: "c",
      JavaScript: "js",
      SQL: "sql",
    };

    const extension = extensionMap[language] || "txt";

    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `solution.${extension}`;
    a.click();

    URL.revokeObjectURL(url);
  };

  // Run with Custom Input
 // In your CodeGen.jsx, replace ONLY the runWithCustomInput function with this code

const runWithCustomInput = async () => {
  const code = getGeneratedCode();

  if (!code || code === "Code not found.") {
    alert("Please generate code first.");
    return;
  }

  setCustomRunLoading(true);
  setCustomOutput("");

  try {
    const response = await fetch("http://127.0.0.1:8000/run-with-input", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        language: language,          // REQUIRED
        custom_input: customInput,   // REQUIRED (must match backend)
      }),
    });

    const data = await response.json();

    if (data.success) {
      if (data.stdout && data.stdout.trim() !== "") {
        setCustomOutput(data.stdout);
      } else {
        setCustomOutput("Program executed successfully. No output produced.");
      }
    } else {
      setCustomOutput(data.stderr || "Execution failed.");
    }
  } catch (error) {
    setCustomOutput("Failed to connect to backend.");
  }

  setCustomRunLoading(false);
};

  // Accordion Component
  const Accordion = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-black/20 backdrop-blur-md border border-yellow-700 rounded-2xl overflow-hidden shadow-xl">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-yellow-900/20 transition text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <span className="text-xl font-bold text-yellow-100">{title}</span>
        </div>

        <span
          className={`text-yellow-300 text-sm transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 pt-2 text-yellow-50/80">
          {children}
        </div>
      )}
    </div>
  );
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-yellow-950 text-white">
      {/* Top Header */}
      <nav className="w-full border-b border-yellow-800/80 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-200">
              CodeNexus
            </h1>
            <p className="text-yellow-50/60 text-sm md:text-base mt-1">
              Code, Analyze & Optimize - all in one place!
            </p>
          </div>

          <button
            onClick ={handleLogout}
            className="hover:text-yellow-100 transition"
          >
    Logout
  </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-97px)] bg-black/20 backdrop-blur-md border-r border-yellow-700 px-6 py-8 shrink-0">
          <h2 className="text-2xl font-bold text-yellow-200 px-6 pb-4 mb-6 border-b border-yellow-700">
            Look Up -
          </h2>

          <div className="flex flex-col gap-3 text-sm md:text-base font-medium">
            <Link
              to="/dashboard"
              className="px-4 py-3 rounded-xl text-yellow-100 hover:bg-yellow-600 hover:text-green-950 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/codegen"
              className="px-4 py-3 rounded-xl bg-yellow-600 text-green-950 font-semibold"
            >
              CodeGen
            </Link>

            {/*<Link
              to="/codeanalyze"
              className="px-4 py-3 rounded-xl text-yellow-100 hover:bg-yellow-600 hover:text-green-950 transition"
            >
              CodeAnalyze
            </Link>*/}

            <Link
              to="/codereview"
              className="px-4 py-3 rounded-xl text-yellow-100 hover:bg-yellow-600 hover:text-green-950 transition"
            >
              CodeReview
            </Link>

            {/*<Link
              to="/history"
              className="px-4 py-3 rounded-xl text-yellow-100 hover:bg-yellow-600 hover:text-green-950 transition"
            >
              History
            </Link> */}

            <Link
              to="/contactus"
              className="px-4 py-3 rounded-xl text-yellow-100 hover:bg-yellow-600 hover:text-green-950 transition"
            >
              Contact Us
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 h-[calc(100vh-97px)] overflow-y-auto px-6 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-yellow-200">
                CodeGen
              </h1>

              <p className="text-yellow-50/70 text-lg max-w-3xl mx-auto leading-8">
                AI-powered coding assistant that generates optimized solutions,
                explanations, complexities, and test cases.
              </p>
            </div>

            {/* Input Card */}
            <div className="bg-black/20 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-8 border border-yellow-700">
              <label className="block text-xl font-bold mb-4 text-yellow-100">
                Problem Statement
              </label>

              <textarea
                rows="10"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Paste your coding problem or real-life scenario"
                className="w-full bg-green-950/60 border border-yellow-700 rounded-2xl p-4 text-yellow-50 placeholder-yellow-200/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              />

              <div className="flex flex-col md:flex-row md:items-end md:justify-between mt-6 gap-4">
                <div>
                  <label className="block mb-2 font-semibold text-yellow-100">
                    Programming Language
                  </label>

                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-green-950/60 border border-yellow-700 rounded-xl px-4 py-3 text-yellow-50"
                  >
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                    <option value="C">C</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="SQL">SQL</option>
                  </select>
                </div>

                <button
                  onClick={solveProblem}
                  disabled={loading}
                  className="bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-green-950 px-8 py-3 rounded-2xl font-bold text-lg shadow-xl transition"
                >
                  {loading ? "Solving..." : "Solve Problem"}
                </button>
              </div>
            </div>

            {/* Error */}
            {result?.error && (
              <div className="bg-red-900/40 border border-red-700 text-red-300 p-4 rounded-2xl mb-6">
                {result.error}
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="bg-black/20 border border-yellow-700 rounded-3xl p-8 text-center shadow-xl">
                <div className="animate-pulse text-3xl mb-2">Thinking...</div>
                <p className="text-yellow-50/70">
                  Analysing & generating solution...
                </p>
              </div>
            )}

            {/* Results */}
            {result && !loading && !result.error && (
              <div className="space-y-6">
                {/* Generated Code */}
                <Accordion title="Generated Code" icon="💻" defaultOpen>
                  <div className="flex gap-3 mb-4 flex-wrap">
                    <button
                      onClick={copyCode}
                      className="bg-yellow-600 hover:bg-yellow-500 text-green-950 px-4 py-2 rounded-xl font-semibold transition"
                    >
                      Copy Code
                    </button>

                    <button
                      onClick={downloadCode}
                      className="bg-yellow-600 hover:bg-yellow-500 text-green-950 px-4 py-2 rounded-xl font-semibold transition"
                    >
                      Download Code
                    </button>
                  </div>

                  <SyntaxHighlighter
                      language={
                        language === "C++"
                          ? "cpp"
                          : language === "JavaScript"
                          ? "javascript"
                          : language.toLowerCase()
                      }
                    style={vscDarkPlus}
                    customStyle={{
                      borderRadius: "12px",
                      fontSize: "14px",
                      padding: "20px",
                      margin: 0,
                    }}
                  >
                    {getGeneratedCode() || "Code not found."}
                  </SyntaxHighlighter>
                </Accordion>

                {/* Explanation */}
                <Accordion title="Explanation" icon="📘">
                  <div className="whitespace-pre-wrap leading-8">
                    {result.explanation || "Explanation not available."}
                  </div>
                </Accordion>

                {/* Time Complexity */}
                <Accordion title="Time Complexity" icon="⏱️">
                  {result.time_complexity || "Not available."}
                </Accordion>

                {/* Space Complexity */}
                <Accordion title="Space Complexity" icon="💾">
                  {result.space_complexity || "Not available."}
                </Accordion>

                {/* Test Cases */}
                <Accordion title="Test Cases" icon="🧪">
                  <div className="mb-4">
                    <button
                      onClick={generateTestCases}
                      disabled={testCasesLoading}
                      className="bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-green-950 px-4 py-2 rounded-xl font-semibold transition"
                    > 
                      {testCasesLoading
                        ? "Generating..."
                        : "Generate Test Cases"}
                    </button>
                  </div>

                  <pre className="whitespace-pre-wrap leading-7">
                    {result.test_cases || "No test cases available."}
                  </pre>
                </Accordion>

                {/* Run with Custom Input */}
{/* Run with Custom Input */}
<div className="bg-black/20 backdrop-blur-md border border-yellow-700 rounded-2xl overflow-hidden shadow-xl">
  {/* Header */}
  <div className="px-6 py-4 border-b border-yellow-700">
    <div className="flex items-center gap-3">
      <span className="text-2xl">▶️</span>
      <span className="text-xl font-bold text-yellow-100">
        Run with Custom Input
      </span>
    </div>
  </div>

  {/* Content */}
  <div className="px-6 pb-6 pt-4 text-yellow-50/80">
    <textarea
      rows="6"
      value={customInput}
      onChange={(e) => setCustomInput(e.target.value)}
      placeholder="Enter custom input here..."
      className="w-full bg-green-950/60 border border-yellow-700 rounded-2xl p-4 text-yellow-50 placeholder-yellow-200/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
    />

    <button
      type="button"
      onClick={runWithCustomInput}
      disabled={language === "SQL" || customRunLoading}
      className="mt-4 bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-green-950 px-6 py-3 rounded-xl font-semibold transition"
    >
      {
 language === "SQL"
   ? "SQL Execution Not Supported"
   : customRunLoading
   ? "⏳ Running..."
   : "▶ Run Code"
}
    </button>

    {customOutput && (
  <div className="mt-4">
    <button
      onClick={() => {
        navigator.clipboard.writeText(customOutput);
        alert("Output copied!");
      }}
      className="mb-2 bg-yellow-600 hover:bg-yellow-500 text-green-950 px-3 py-2 rounded-lg font-semibold"
    >
      Copy Output
    </button>

    <pre className="bg-green-950/60 p-4 rounded-xl text-sm whitespace-pre-wrap">
      {customOutput}
    </pre>
  </div>
)}
  </div>
</div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default CodeGen;