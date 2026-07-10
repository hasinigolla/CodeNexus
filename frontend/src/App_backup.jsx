import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function App() {
  const [problem, setProblem] = useState("");
  const [language, setLanguage] = useState("Python");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const solveProblem = async () => {
    if (!problem.trim()) {
      alert("Please enter a problem statement.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("https://codenexus-production-ee84.up.railway.app/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problem_statement: problem,
          language: language,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        error:
          "Failed to connect to backend. Make sure FastAPI is running on port 8000.",
      });
    }

    setLoading(false);
  };

  const extractCode = (solutionText) => {
    if (!solutionText) return "";

    const match = solutionText.match(/```[\w]*\n([\s\S]*?)```/);
    if (match) return match[1];

    return solutionText;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-4">
            CodeNexus
          </h1>
          <p className="text-slate-400 text-lg">
            Autonomous Competetive Programming AI Agent that solves, executes, tests, and fixes code!
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-slate-900 rounded-2xl shadow-xl p-6 mb-8 border border-slate-800">
          <label className="block text-lg font-semibold mb-3">
            Problem Statement
          </label>

          <textarea
            rows="10"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Paste your coding problem here..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-4">
            <div>
              <label className="block mb-2 font-medium">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
              >
                <option>Python</option>
                <option>Java</option>
                <option>C++</option>
                <option>JavaScript</option>
              </select>
            </div>

            <button
              onClick={solveProblem}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 px-8 py-3 rounded-xl font-semibold text-lg transition"
            >
              {loading ? "⏳ Solving..." : "🚀 Solve Problem"}
            </button>
          </div>
        </div>

        {/* Error */}
        {result?.error && (
          <div className="bg-red-900/40 border border-red-700 text-red-300 p-4 rounded-xl mb-6">
            {result.error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-slate-900 rounded-2xl p-8 text-center border border-slate-800">
            <div className="animate-pulse text-2xl mb-2">🤖 Thinking...</div>
            <p className="text-slate-400">
              Generating solution, executing code, and testing...
            </p>
          </div>
        )}

        {/* Results */}
        {result && !loading && !result.error && (
          <div className="space-y-6">
            {/* Solution Explanation */}
            {result.solution && (
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                <h2 className="text-2xl font-bold mb-4">
                  📘 Solution Explanation
                </h2>
                <div className="whitespace-pre-wrap text-slate-300 leading-7">
                  {result.solution}
                </div>
              </div>
            )}

            {/* Code */}
            {result.solution && (
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                <h2 className="text-2xl font-bold mb-4">💻 Generated Code</h2>
                <SyntaxHighlighter
                  language={language.toLowerCase()}
                  style={vscDarkPlus}
                  customStyle={{
                    borderRadius: "12px",
                    fontSize: "14px",
                    padding: "20px",
                  }}
                >
                  {extractCode(result.solution)}
                </SyntaxHighlighter>
              </div>
            )}

            {/* Execution Result */}
            {result.execution && (
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                <h2 className="text-2xl font-bold mb-4">
                  ⚙️ Execution Result
                </h2>

                <div className="mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      result.execution.success
                        ? "bg-green-700 text-white"
                        : "bg-red-700 text-white"
                    }`}
                  >
                    {result.execution.success ? "Success" : "Failed"}
                  </span>
                </div>

                {result.execution.stdout && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Standard Output</h3>
                    <pre className="bg-slate-800 p-4 rounded-xl overflow-auto text-sm">
                      {result.execution.stdout}
                    </pre>
                  </div>
                )}

                {result.execution.stderr && (
                  <div>
                    <h3 className="font-semibold mb-2">Errors</h3>
                    <pre className="bg-slate-800 p-4 rounded-xl overflow-auto text-sm text-red-300">
                      {result.execution.stderr}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Auto Fix */}
            {result.auto_fix && (
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                <h2 className="text-2xl font-bold mb-4">
                  🔧 Auto-Fixed Code
                </h2>

                <SyntaxHighlighter
                  language={language.toLowerCase()}
                  style={vscDarkPlus}
                  customStyle={{
                    borderRadius: "12px",
                    fontSize: "14px",
                    padding: "20px",
                  }}
                >
                  {result.auto_fix.fixed_code}
                </SyntaxHighlighter>

                {result.auto_fix.execution && (
                  <div className="mt-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        result.auto_fix.execution.success
                          ? "bg-green-700 text-white"
                          : "bg-red-700 text-white"
                      }`}
                    >
                      {result.auto_fix.execution.success
                        ? "Auto-Fix Successful"
                        : "Auto-Fix Failed"}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Test Cases */}
            {result.test_cases && (
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                <h2 className="text-2xl font-bold mb-4">
                  🧪 Generated Test Cases
                </h2>
                <div className="whitespace-pre-wrap text-slate-300 leading-7">
                  {result.test_cases}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;