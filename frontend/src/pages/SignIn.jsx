import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Signin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", data.name);
        localStorage.setItem("email", data.email);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-yellow-950 flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-md bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl shadow-2xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-yellow-200">
            CodeNexus
          </h1>

          <p className="text-yellow-50/70 mt-2 text-sm">
            Sign in to continue your coding journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-yellow-100 font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-green-950/60 border border-yellow-700 text-yellow-50 placeholder-yellow-200/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-yellow-100 font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-green-950/60 border border-yellow-700 text-yellow-50 placeholder-yellow-200/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-lg bg-yellow-600 hover:bg-yellow-500 text-green-950 transition shadow-xl"
          >
            Sign In
          </button>
        </form>

        {/* Links */}
        <p className="text-center text-yellow-100/70 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-yellow-300 hover:text-yellow-200 font-semibold"
          >
            Sign Up
          </Link>
        </p>

        <p className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-yellow-300 hover:text-yellow-200 text-sm"
            >
              Forgot Password?
            </Link>
          </p>
        <p className="text-center mt-4">
          <Link
            to="/"
            className="text-yellow-200/80 hover:text-yellow-100 text-sm"
          >
            Back to Home
          </Link>
        </p>
        

      </div>
    </div>
  );
}

export default Signin;