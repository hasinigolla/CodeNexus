import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [favLang, setFavLang] = useState("");
  const [passkey, setPasskey] = useState("");

  const handleSignup = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch("https://codenexus-production-ee84.up.railway.app/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        fav_lang: favLang,
        passkey,
      }),
    });

    const data = await response.json();

    console.log("Response:", data);

    alert(data.message);

    if (data.success) {
      navigate("/dashboard");
    }

  } catch (error) {
    console.error("Signup Error:", error);
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-yellow-950 text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl shadow-2xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-4xl font-extrabold text-yellow-200"
          >
            CodeNexus
          </Link>

          <p className="text-yellow-50/70 mt-2">
            Sign up to join CodeNexus and start coding smarter.
          </p>
        </div>

        {/* Signup Form */}
        <form className="space-y-5" onSubmit={handleSignup}>

          {/* Username */}
          <div>
            <label className="block mb-2 font-semibold text-yellow-100">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-green-950/60 border border-yellow-700 text-yellow-50 placeholder-yellow-200/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold text-yellow-100">
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
            <label className="block mb-2 font-semibold text-yellow-100">
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

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 font-semibold text-yellow-100">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-green-950/60 border border-yellow-700 text-yellow-50 placeholder-yellow-200/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Favorite Programming Language */}
          <div>
              <label className="block mb-2 font-semibold text-yellow-100">
                Favorite Programming Language
              </label>

              <input
                type="text"
                value={favLang}
                onChange={(e)=>setFavLang(e.target.value)}
                placeholder="Java, Python..."
                className="w-full px-4 py-3 rounded-xl bg-green-950/60 border border-yellow-700"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-yellow-100">
                Secret Passkey
              </label>

              <input
                type="password"
                value={passkey}
                onChange={(e)=>setPasskey(e.target.value)}
                placeholder="Remember this passkey"
                className="w-full px-4 py-3 rounded-xl bg-green-950/60 border border-yellow-700"
                required
              />
            </div>



          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-yellow-600 hover:bg-yellow-500 text-green-950 font-bold text-lg shadow-xl transition"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 border-t border-yellow-700/40"></div>

        {/* Links */}
        <p className="text-center text-yellow-50/70">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-yellow-300 font-semibold hover:text-yellow-200"
          >
            Sign In
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

export default Signup;