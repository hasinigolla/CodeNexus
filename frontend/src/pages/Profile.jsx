import { useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [name, setName] = useState(
    localStorage.getItem("userName") || ""
  );

  const email =
    localStorage.getItem("userEmail") || "";

  const updateProfile = async () => {
    try {
      const response = await fetch(
        "https://codenexus-production-ee84.up.railway.app/update-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            name,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      localStorage.setItem(
        "userName",
        name
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

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

          <Link
            to="/dashboard"
            className="text-yellow-200 hover:text-yellow-100"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Profile Card */}
        <div className="bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl shadow-2xl p-8">

          {/* Avatar */}
          <div className="flex flex-col items-center">

            <div className="w-32 h-32 rounded-full bg-yellow-600 flex items-center justify-center text-5xl font-bold text-green-950 shadow-xl">
              {name ? name.charAt(0).toUpperCase() : "U"}
            </div>

            <h2 className="text-3xl font-bold text-yellow-200 mt-4">
              {name}
            </h2>

            <p className="text-yellow-50/70">
              {email}
            </p>

          </div>

          {/* Form */}
          <div className="mt-10 grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 text-yellow-100 font-semibold">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl bg-green-950/60 border border-yellow-700 text-yellow-50"
              />
            </div>

            <div>
              <label className="block mb-2 text-yellow-100 font-semibold">
                Email
              </label>

              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-yellow-700 text-yellow-50"
              />
            </div>

          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={updateProfile}
              className="bg-yellow-600 hover:bg-yellow-500 text-green-950 font-bold px-8 py-3 rounded-xl shadow-xl"
            >
              Save Changes
            </button>
          </div>

        </div>

        {/* Statistics Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-black/20 backdrop-blur-md border border-yellow-700 rounded-2xl p-6 text-center">
            <h3 className="text-yellow-100 text-lg">
              Code Reviews
            </h3>

            <p className="text-4xl font-bold text-yellow-300 mt-3">
              0
            </p>
          </div>

          <div className="bg-black/20 backdrop-blur-md border border-yellow-700 rounded-2xl p-6 text-center">
            <h3 className="text-yellow-100 text-lg">
              Solutions Generated
            </h3>

            <p className="text-4xl font-bold text-yellow-300 mt-3">
              0
            </p>
          </div>

          <div className="bg-black/20 backdrop-blur-md border border-yellow-700 rounded-2xl p-6 text-center">
            <h3 className="text-yellow-100 text-lg">
              Member
            </h3>

            <p className="text-2xl font-bold text-yellow-300 mt-3">
              2026
            </p>
          </div>

        </div>

        {/* Activity Section */}
        <div className="bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl p-8 mt-10">

          <h2 className="text-2xl font-bold text-yellow-200 mb-6">
            Recent Activity
          </h2>

          <ul className="space-y-3 text-yellow-50/80">
            <li>✓ Logged into CodeNexus</li>
            <li>✓ Updated Profile</li>
            <li>✓ Generated AI Solutions</li>
            <li>✓ Reviewed Source Code</li>
          </ul>

        </div>

      </div>

    </div>
  );
}

export default Profile;