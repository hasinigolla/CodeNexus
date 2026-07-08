import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-yellow-950 px-6 py-6 border-t border-yellow-800/80 text-white">
      {/* Navbar */}
<nav className="w-full border-b border-yellow-800/80">

  <div className="px-6 py-4 flex items-center justify-between">

    {/* Logo + Caption */}
    <div className="flex flex-col">
      <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-200">
        CodeNexus
      </h1>

      <p className="text-white-100/60 text-sm md:text-base mt-1">
        ~Code, Analyze & Optimize - all in one place!
      </p>
    </div>

    {/* Buttons */}
    <div className="flex items-center gap-3">
      <Link
        to="/signin"
        className="px-4 py-2 rounded-xl border border-yellow-300 text-yellow-200 hover:bg-yellow-900/20 transition text-sm md:text-base"
      >
        Sign In
      </Link>

      <Link
        to="/signup"
        className="px-4 py-2 rounded-xl bg-yellow-600 hover:bg-yellow-500 text-green-950 font-semibold transition text-sm md:text-base shadow-lg"
      >
        Get Started
      </Link>
    </div>

  </div>

</nav>

      {/* Hero Section */}
      <section className="px-6 py-10 md:py-15">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <p className="inline-block px-4 py-2 mb-6 rounded-full bg-green-900/50 border border-yellow-700 text-yellow-100 text-sm md:text-base">
              AI-Powered Coding Assistant
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Build Better
              <span className="block text-yellow-200">
                Code Faster
              </span>
            </h1>

            <p className="text-yellow-50/85 text-lg md:text-xl leading-8 max-w-2xl mx-auto md:mx-0 mb-8">
              CodeNexus - a central hub that helps you generate optimized code, analyze complexity
              and review the code quality using powerful AI models.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/signin"
                className="px-8 py-4 rounded-2xl bg-yellow-600 hover:bg-yellow-500 text-green-950 font-bold text-lg shadow-xl transition"
              >
                Generate
              </Link>

              <Link
                to="/signin"
                className="px-8 py-4 rounded-2xl bg-yellow-600 hover:bg-yellow-500 text-green-950 font-bold text-lg shadow-xl transition"
              >
                Analyze
              </Link>

              <Link
                to="/signin"
                className="px-8 py-4 rounded-2xl bg-yellow-600 hover:bg-yellow-500 text-green-950 font-bold text-lg shadow-xl transition"
              >
                Review
              </Link>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center">
            <div className="w-full max-w-md bg-black/20 backdrop-blur-md rounded-3xl border border-yellow-700 shadow-2xl p-6">
              {/* Fake Code Window */}
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>

              <pre className="text-sm md:text-base text-yellow-100 leading-7 overflow-x-auto">
{`def twoSum(nums, target):
    seen = {}  
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i

    return []`}
              </pre>

              <div className="mt-6 p-4 rounded-2xl bg-green-900/40 border border-yellow-700">
                <p className="text-yellow-100 text-sm">
                  ✓ Time Complexity: O(n)
                </p>
                <p className="text-yellow-100 text-sm mt-1">
                  ✓ Space Complexity: O(n)
                </p>
                <p className="text-yellow-100 text-sm mt-1">
                  ✓ All test cases passed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* Features Section */}
<section className="mt-16 px-6 pb-16 md:pb-24">

  <div className="max-w-7xl mx-auto">

    <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-yellow-200">
      Built-in Intelligence
    </h2>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* Code Generation */}
      <div className="bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
        <div className="text-yellow-300 text-2xl font-bold mb-4">&lt;/&gt;</div>
        <h3 className="italic text-2xl font-bold mb-3 text-yellow-200">CodeGen</h3>
        <p className="text-yellow-50/80 leading-7">
          Generate optimized solutions, explanations, and test cases from problem statements.
        </p>
      </div>

      {/* Code Analysis */}
      <div className="bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
        <div className="text-yellow-300 text-2xl font-bold mb-4">T(c)=O(n)</div>
        <h3 className="italic text-2xl font-bold mb-3 text-yellow-200">CodeAnalyze</h3>
        <p className="text-yellow-50/80 leading-7">
          Analyze time and space complexity with bottleneck detection.
        </p>
      </div>

      {/* Code Review */}
      <div className="bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
        <div className="text-yellow-300 text-2xl font-bold mb-4">[?]</div>
        <h3 className="italictext-2xl font-bold mb-3 text-yellow-200">CodeReview</h3>
        <p className="text-yellow-50/80 leading-7">
          Improve readability, performance, and detect bugs.
        </p>
      </div>

      {/* Code Explain */}
      <div className="bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
        <div className="text-yellow-300 text-2xl font-bold mb-4">while(understand): explain</div>
        <h3 className="italic text-2xl font-bold mb-3 text-yellow-200">CodeExplain</h3>
        <p className="text-yellow-50/80 leading-7">
          Step-by-step explanation of code logic in simple language.
        </p>
      </div>

      {/* Bug Detector */}
      <div className="bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
        <div className="text-yellow-300 text-2xl font-bold mb-4">[ERROR]</div>
        <h3 className=" italic text-2xl font-bold mb-3 text-yellow-200">BugDetect</h3>
        <p className="text-yellow-50/80 leading-7">
          Identify logical errors and runtime issues in code instantly.
        </p>
      </div>

      {/* Code Optimizer */}
      <div className="bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
        <div className="text-yellow-300 text-2xl font-bold mb-4">[✓]</div>
        <h3 className="italic text-2xl font-bold mb-3 text-yellow-200">Optimizer</h3>
        <p className="text-yellow-50/80 leading-7">
          Refactor code into faster, cleaner, and production-ready version.
        </p>
      </div>

    </div>
  </div>
</section>

 

{/* ================= DISCOVER MORE ================= */}
<section className="mt-20 px-6 pb-24">

  <div className="max-w-7xl mx-auto">

    <h2 className="text-4xl md:text-6xl font-extrabold text-center text-yellow-200 mb-6">
      Discover the Power of CodeNexus
    </h2>

    <p className="text-center text-yellow-50/75 max-w-4xl mx-auto text-lg leading-8 mb-20">
      One platform. Multiple AI powered smart tools. Whether you're preparing for coding
      interviews, solving DSA problems, or learning new concepts, CodeNexus helps you code smarter and faster.
    </p>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">

      <div className="bg-black/20 backdrop-blur-md rounded-3xl border border-yellow-700 p-6 text-center">
        <h3 className="text-4xl font-bold text-yellow-200">6+</h3>
        <p className="text-yellow-50/70 mt-2">AI-Powered Tools</p>
      </div>

      <div className="bg-black/20 backdrop-blur-md rounded-3xl border border-yellow-700 p-6 text-center">
        <h3 className="text-4xl font-bold text-yellow-200">5+</h3>
        <p className="text-yellow-50/70 mt-2">Languages</p>
      </div>

      <div className="bg-black/20 backdrop-blur-md rounded-3xl border border-yellow-700 p-6 text-center">
        <h3 className="text-4xl font-bold text-yellow-200">24/7</h3>
        <p className="text-yellow-50/70 mt-2">AI Assistance</p>
      </div>

      <div className="bg-black/20 backdrop-blur-md rounded-3xl border border-yellow-700 p-6 text-center">
        <h3 className="text-4xl font-bold text-yellow-200">∞</h3>
        <p className="text-yellow-50/70 mt-2">Coding Possibilities</p>
      </div>

    </div>

    {/* CodeGen */}
    <div className="grid md:grid-cols-2 gap-12 items-center mb-24">

      <div>
        <h3 className="text-4xl font-bold text-yellow-200 mb-6">
           Generate Complete Solutions
        </h3>

        <p className="text-yellow-50/80 leading-8 text-lg">
          Enter any coding problem and receive an optimized solution instantly.
          CodeNexus generates clean code, detailed explanations, complexity
          analysis and test cases automatically.
        </p>

        <div className="mt-6 space-y-3 text-yellow-100">
          <p>✓ AI Generated Code</p>
          <p>✓ Detailed Explanation</p>
          <p>✓ Time & Space Complexity</p>
          <p>✓ Auto Generated Test Cases</p>
        </div>
      </div>

      <div className="bg-black/20 border border-yellow-700 rounded-3xl p-6 shadow-2xl">
        <pre className="text-yellow-100 overflow-x-auto">
{`Problem:
Find Two Sum

Output:
✓ Optimized Solution
✓ O(n) Complexity
✓ Test Cases Generated
✓ Explanation Included`}
        </pre>
      </div>

    </div>

    {/* Analyze */}
    <div className="grid md:grid-cols-2 gap-12 items-center mb-24">

      <div className="bg-black/20 border border-yellow-700 rounded-3xl p-6 shadow-2xl">
        <pre className="text-yellow-100 overflow-x-auto">
{`Analysis Report

Time Complexity: O(n)

Space Complexity: O(n)

Performance Score: 92%

Optimization Available`}
        </pre>
      </div>

      <div>
        <h3 className="text-4xl font-bold text-yellow-200 mb-6">
           Analyze Performance
        </h3>

        <p className="text-yellow-50/80 leading-8 text-lg">
          Understand exactly how your algorithm behaves. Detect bottlenecks,
          measure runtime efficiency and discover optimization opportunities.
        </p>
      </div>

    </div>

    {/* Review */}
    <div className="grid md:grid-cols-2 gap-12 items-center mb-24">

      <div>
        <h3 className="text-4xl font-bold text-yellow-200 mb-6">
           Intelligent Code Review
        </h3>

        <p className="text-yellow-50/80 leading-8 text-lg">
          Get instant feedback on coding style, maintainability, edge cases,
          performance issues and best practices.
        </p>
      </div>

      <div className="bg-black/20 border border-yellow-700 rounded-3xl p-6 shadow-2xl">
        <pre className="text-yellow-100 overflow-x-auto">
{`Review Results

✓ Cleaner Variable Names
✓ Edge Cases Missing
✓ Logic Improved
✓ Readability Enhanced`}
        </pre>
      </div>

    </div>

    {/* Workflow */}
    <div className="mb-24">

      <h2 className="text-4xl md:text-5xl font-bold text-center text-yellow-200 mb-16">
        How CodeNexus Works
      </h2>

      <div className="grid md:grid-cols-4 gap-8">

        <div className="bg-black/20 border border-yellow-700 rounded-3xl p-6 text-center">
          <div className="text-5xl mb-4">1️⃣</div>
          <h3 className="font-bold text-yellow-200 mb-3">
            Enter Problem
          </h3>
          <p className="text-yellow-50/70">
            Paste your coding challenge.
          </p>
        </div>

        <div className="bg-black/20 border border-yellow-700 rounded-3xl p-6 text-center">
          <div className="text-5xl mb-4">2️⃣</div>
          <h3 className="font-bold text-yellow-200 mb-3">
            AI Processing
          </h3>
          <p className="text-yellow-50/70">
            Understands the problem and finds the best approach.
          </p>
        </div>

        <div className="bg-black/20 border border-yellow-700 rounded-3xl p-6 text-center">
          <div className="text-5xl mb-4">3️⃣</div>
          <h3 className="font-bold text-yellow-200 mb-3">
            Generate Results
          </h3>
          <p className="text-yellow-50/70">
            Creates code, explanations and test cases.
          </p>
        </div>

        <div className="bg-black/20 border border-yellow-700 rounded-3xl p-6 text-center">
          <div className="text-5xl mb-4">4️⃣</div>
          <h3 className="font-bold text-yellow-200 mb-3">
            Improve Code
          </h3>
          <p className="text-yellow-50/70">
            Analyze, review and optimize instantly.
          </p>
        </div>

      </div>

    </div>

    {/* CTA */}
    <div className="bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl p-12 text-center">

      <h2 className="text-4xl md:text-5xl font-bold text-yellow-200 mb-6">
        Ready to Level Up Your Coding?
      </h2>

      <p className="text-yellow-50/80 text-lg leading-8 max-w-3xl mx-auto mb-10">
        Generate code, analyze performance, detect bugs,
        review quality and optimize solutions -
        all from one powerful AI platform.
      </p>

      <Link
        to="/signup"
        className="inline-block px-10 py-5 rounded-2xl bg-yellow-600 hover:bg-yellow-500 text-green-950 font-bold text-xl shadow-xl transition"
      >
        Start Building with CodeNexus
      </Link>

    </div>

  </div>

</section>

{/* Footer */}
      <footer className="px-6 py-6 border-t border-yellow-800/80 text-center text-yellow-100/60 text-sm">
        Designed & Devoloped by <h2 className="text-0.5xl font-bold text-yellow-50">Hasini Golla</h2>
        © 2026 CodeNexus. All rights reserved.
      </footer>
    </div>
  );
}
export default Home;