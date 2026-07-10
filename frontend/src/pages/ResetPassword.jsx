import { useState, useEffect } from "react";
import {useLocation,useNavigate} from "react-router-dom";

export default function ResetPassword(){

const location = useLocation();
const navigate = useNavigate();

const email = location.state?.email;

const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

// Redirect if user directly opens this page
useEffect(() => {
  if (!email) {
    navigate("/forgot-password");
  }
}, [email, navigate]);

// Prevent rendering until redirect happens
if (!email) {
  return null;
}

const changePassword=async(e)=>{

        e.preventDefault();

        if(newPassword!==confirmPassword){

        alert("Passwords don't match");

        return;

}

const response=await fetch("https://codenexus-production-ee84.up.railway.app/reset-password",{

        method:"POST",

        headers:{

        "Content-Type":"application/json"

        },

        body:JSON.stringify({

        email,

        password:newPassword

        })

});

const data=await response.json();

alert(data.message);

if(data.success){

    navigate("/signin");

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

        <h2 className="text-2xl font-bold text-yellow-100 mt-3">
          Create a New Password
        </h2>

        <p className="text-yellow-50/70 mt-3 text-sm leading-6">
          Your identity has been successfully verified. Create a strong
          password to secure your CodeNexus account.
        </p>
      </div>

      {/* Reset Password Form */}
      <form onSubmit={changePassword} className="space-y-5">

        {/* New Password */}
        <div>
          <label className="block text-yellow-100 font-semibold mb-2">
            New Password
          </label>

          <input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-green-950/60 border border-yellow-700 text-yellow-50 placeholder-yellow-200/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-yellow-100 font-semibold mb-2">
            Confirm New Password
          </label>

          <input
            type="password"
            placeholder="Re-enter your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-green-950/60 border border-yellow-700 text-yellow-50 placeholder-yellow-200/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-bold text-lg bg-yellow-600 hover:bg-yellow-500 text-green-950 transition shadow-xl"
        >
          Update Password
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-yellow-100/70 text-sm">
          Once updated, use your new password to sign in to your
          CodeNexus account.
        </p>
      </div>

    </div>
  </div>
);


}