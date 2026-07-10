import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/logout";

function CodeReview() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Python");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  const reviewCode = async () => {
  if (!code.trim()) return;

  setLoading(true);

  try {
    const res = await fetch("https://codenexus-production-ee84.up.railway.app/review-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code,
        language
      })
    });

    const data = await res.json();
    setResult(data.result);

  } catch (err) {
    console.error(err);
  }

  setLoading(false);
};

  const Card = ({ title, children, highlight }) => (
    <div className="bg-black/20 backdrop-blur-md border border-yellow-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-yellow-100 mb-3">{title}</h3>
      <div className={highlight ? "text-4xl font-extrabold text-yellow-300" : "text-yellow-50/80"}>
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-yellow-950 text-white">
      
      {/* Navbar */}
      <nav className="w-full border-b border-yellow-800/80 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-yellow-200">
              CodeNexus
            </h1>
            <p className="text-yellow-50/60 text-sm mt-1">
              Code, Analyze & Optimize - all in one place!
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="text-lg font-semibold text-yellow-200 hover:text-yellow-100 transition"
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

          <div className="flex flex-col gap-3">
            <Link to="/dashboard" className="px-4 py-3 rounded-xl text-yellow-100 hover:bg-yellow-600 hover:text-green-950 transition">Dashboard</Link>
            <Link to="/codegen" className="px-4 py-3 rounded-xl text-yellow-100 hover:bg-yellow-600 hover:text-green-950 transition">CodeGen</Link>
            {/*<Link to="/codeanalyze" className="px-4 py-3 rounded-xl text-yellow-100 hover:bg-yellow-600 hover:text-green-950 transition">CodeAnalyze</Link>*/}
            <Link to="/codereview" className="px-4 py-3 rounded-xl bg-yellow-600 text-green-950 font-semibold">CodeReview</Link>
            {/*<Link to="/history" className="px-4 py-3 rounded-xl text-yellow-100 hover:bg-yellow-600 hover:text-green-950 transition">History</Link>*/}
            <Link to="/contactus" className="px-4 py-3 rounded-xl text-yellow-100 hover:bg-yellow-600 hover:text-green-950 transition">Contact Us</Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 h-[calc(100vh-97px)] overflow-y-auto px-6 py-8">
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-5xl font-extrabold text-yellow-200 mb-4">
                CodeReview
              </h1>
              <p className="text-yellow-50/70 text-lg">
                Your Hybrid AI Code Reviewer that intelligently review, optimize & analysis all your coding issues.
              </p>
            </div>

            {/* Input */}
            <div className="bg-black/20 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-10 border border-yellow-700">
              <label className="block text-xl font-bold mb-4 text-yellow-100">
                Paste Your Code 
              </label>

              <textarea
                rows="14"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your source code here..."
                className="w-full bg-green-950/60 border border-yellow-700 rounded-2xl p-4 text-yellow-50"
              />

              <div className="flex justify-between items-end mt-6">
                
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-green-950/60 border border-yellow-700 rounded-xl px-4 py-3 text-yellow-50"
                >
                  <option>Python</option>
                  <option>Java</option>
                  <option>C++</option>
                  <option>C</option>
                  <option>JavaScript</option>
                  <option>SQL</option>
                </select>

                <button
                  onClick={reviewCode}
                  disabled={loading}
                  className="bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-green-950 px-8 py-3 rounded-2xl font-bold"
                >
                  {loading ? "Reviewing..." : "Review Code"}
                </button>
              </div>
            </div>

            {/* RESULTS GRID */}
            {result && (
              <div className="grid md:grid-cols-2 gap-6">

                <Card title="Nexus Score" highlight>
                  {result.nexus_score}/100
                </Card>

                <Card title="Bugs Found">
                  {result.bugs}
                </Card>

                <Card title="Suggestions">
                  {result.suggestions}
                </Card>

                <Card title="Time Complexity">
                  {result.time_complexity}
                </Card>

                <Card title="Space Complexity">
                  {result.space_complexity}
                </Card>

               <div className="md:col-span-2">
  <Card title="Optimized Code">

    <div className="flex justify-end mb-3">
      <button
        onClick={() => {
          navigator.clipboard.writeText(
            result.optimized_code || ""
          );

          setCopied(true);

          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }}
        className="bg-yellow-600 hover:bg-yellow-500 text-green-950 px-4 py-2 rounded-lg font-semibold"
      >
        {copied ? "Copied ✓" : "Copy Code"}
      </button>
    </div>

    <pre className="bg-green-950/60 p-4 rounded-xl overflow-x-auto text-sm whitespace-pre">
      {result.optimized_code || "No optimized code available"}
    </pre>

    {result.optimization_note && (
      <p className="text-yellow-300 mt-3 font-semibold">
        {result.optimization_note}
      </p>
    )}

  </Card>
</div>

              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

export default CodeReview;