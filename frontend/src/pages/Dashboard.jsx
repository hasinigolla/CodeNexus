import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../utils/logout";

function Dashboard() {
  const [username, setUsername] = useState("");
  const features = [
  {
    name: "CodeGen",
    description:
      "Generate optimized solutions with explanations, time & space complexity, multiple approaches, and comprehensive test cases.",
    icon: "💻",
    path: "/codegen",
  },

  {
    name: "CodeReview",
    description:
      "Detect bugs, improve code quality, optimize performance, and receive AI-powered suggestions following industry best practices.",
    icon: "🔍",
    path: "/codereview",
  },

  {
    name: "CodeAnalyze",
    description:
      "Explore comprehensive AI-powered analytics including performance metrics, code quality assessment, complexity insights, maintainability score, optimization opportunities, and intelligent visual reports that help you write production-ready software.",
    icon: "📈",
    path: "/codeanalyze",
    featured: true,
  },
];

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  useEffect(() => {
  const name = localStorage.getItem("username");

  if (name) {
    setUsername(name);
  }
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-yellow-950 text-white">

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
    <div className="flex items-center gap-6 text-yellow-200 text-sm md:text-base font-medium">

  {/*<Link
    to="/"
    className="hover:text-yellow-100 transition"
  >
    Home
  </Link>*/}

  {/*<Link
    to="/history"
    className="hover:text-yellow-100 transition"
  >
    History
  </Link>*/}

  {/*<Link
    to="/profile"
    className="hover:text-yellow-100 transition"
  >
    Profile
  </Link>*/}

  <Link
    to="/contactus"
    className="hover:text-yellow-100 transition"
  >
    Connect&Collaborate
  </Link>

  <button
    onClick ={handleLogout}
    className="hover:text-yellow-100 transition"
  >
    Logout
  </button>

</div>

  </div>

</nav>

      {/* Header */}
      <section className="px-6 pt-12 pb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Welcome to
          <span className="block text-yellow-200">
            Your Nexus Space, {username}
          </span>
        </h1>

        <p className="text-yellow-50/70 text-lg md:text-xl max-w-3xl mx-auto leading-8">
          Choose a feature below to turn ideas into code, analyze efficiency, and refine your code with AI assistance.
        </p>
      </section>

      {/* Feature Cards */}
<section className="px-6 pb-16">

  {/* Top Row */}
  <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

    {features
      .filter((f) => !f.featured)
      .map((feature) => (
        <Link
          key={feature.name}
          to={feature.path}
          className="group bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl p-8 shadow-2xl hover:scale-105 hover:border-yellow-400 transition duration-300"
        >
          <div className="text-5xl mb-6">
            {feature.icon}
          </div>

          <h2 className="text-3xl font-bold mb-4 group-hover:text-yellow-300 transition">
            {feature.name}
          </h2>

          <p className="text-yellow-50/70 leading-8">
            {feature.description}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-yellow-300 font-semibold">
            Open Feature 
          </div>
        </Link>
      ))}
  </div>

  {/* Featured Card */}
  <div className="flex justify-center mt-12">

    <Link
      to="/codeanalyze"
      className="group w-full max-w-4xl bg-gradient-to-r from-green-950/70 via-green-900/70 to-yellow-900/40 backdrop-blur-lg border-2 border-yellow-500 rounded-[30px] p-10 shadow-[0_0_40px_rgba(234,179,8,0.18)] hover:scale-[1.02] hover:border-yellow-300 transition duration-300"
    >

      <div className="flex items-center justify-between flex-wrap gap-6">

        <div className="flex-1">

          <span className="inline-block px-4 py-1 mb-4 rounded-full bg-yellow-500 text-green-950 font-bold text-sm">
            ★ PREMIUM ANALYTICS
          </span>

          <h2 className="text-4xl font-extrabold text-yellow-200 mb-9">
            📊 CodeNexus Analytics (CodeAnalyze)
          </h2>

          <p className="text-yellow-50/80 text-lg leading-8">
            Unlock the complete intelligence of <b>CodeNexus</b>. Analyze your
            code through advanced AI metrics including <b>Performance Score</b>,
            <b> Maintainability</b>, <b>Code Quality</b>,
            <b> Complexity Analysis</b>, <b>Optimization Insights</b>,
            <b> AI Confidence</b>, and comprehensive visual analytics designed
            for interview preparation and production-ready development.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">

            <div className="bg-black/20 rounded-xl p-4 border border-yellow-700">
              ⚡ Performance
            </div>

            <div className="bg-black/20 rounded-xl p-4 border border-yellow-700">
              📈 AI Metrics
            </div>

            <div className="bg-black/20 rounded-xl p-4 border border-yellow-700">
              🧠 Complexity
            </div>

            <div className="bg-black/20 rounded-xl p-4 border border-yellow-700">
              🎯 Code Quality
            </div>

            <div className="bg-black/20 rounded-xl p-4 border border-yellow-700">
              🚀 Optimization
            </div>

            <div className="bg-black/20 rounded-xl p-4 border border-yellow-700">
              📊 Visual Reports
            </div>

          </div>

          <div className="mt-8 inline-flex items-center gap-3 text-yellow-300 text-lg font-bold">
            Explore Advanced Analytics 
          </div>

        </div>

        <div className="hidden lg:flex items-center justify-center text-[130px] opacity-90">
          
        </div>

      </div>

    </Link>

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

export default Dashboard;