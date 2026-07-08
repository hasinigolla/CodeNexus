import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword(){

    const navigate=useNavigate();

    const[email,setEmail]=useState("");
    const[favLang,setFavLang]=useState("");
    const[passkey,setPasskey]=useState("");

    const verifyUser=async(e)=>{

        e.preventDefault();

        const response=await fetch("http://localhost:8000/verify-user",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                email,
                fav_lang:favLang,
                passkey

            })

        });

        const data=await response.json();

        if(data.success){

            navigate("/reset-password",{

                state:{email}

            });

        }

        else{

            alert(data.message);

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
          Identity Verification
        </h2>

        <p className="text-yellow-50/70 mt-3 text-sm leading-6">
          Before resetting your password, please verify your identity
          using the details you provided during account creation.
        </p>
      </div>

      {/* Verification Form */}
      <form onSubmit={verifyUser} className="space-y-5">

        {/* Email */}
        <div>
          <label className="block text-yellow-100 font-semibold mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-green-950/60 border border-yellow-700 text-yellow-50 placeholder-yellow-200/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        {/* Favorite Language */}
        <div>
          <label className="block text-yellow-100 font-semibold mb-2">
            Favorite Programming Language
          </label>

          <input
            type="text"
            placeholder="Example: Python, Java, C++"
            value={favLang}
            onChange={(e) => setFavLang(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-green-950/60 border border-yellow-700 text-yellow-50 placeholder-yellow-200/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        {/* Secret Passkey */}
        <div>
          <label className="block text-yellow-100 font-semibold mb-2">
            Secret Passkey
          </label>

          <input
            type="password"
            placeholder="Enter your secret passkey"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-green-950/60 border border-yellow-700 text-yellow-50 placeholder-yellow-200/40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-bold text-lg bg-yellow-600 hover:bg-yellow-500 text-green-950 transition shadow-xl"
        >
          Verify Identity
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-yellow-100/70 text-sm mt-6">
        After successful verification, you'll be able to create a new
        password for your CodeNexus account.
      </p>

    </div>
  </div>
);
        

}