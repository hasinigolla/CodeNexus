import { Link } from "react-router-dom";

function Logout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-yellow-950 text-white flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl shadow-2xl p-8 text-center">
                <h1 className="text-4xl font-extrabold text-yellow-200 mb-4">
                    You have been logged out
                </h1>
                <p className="text-yellow-50/70 text-lg md:text-xl mb-6">
                    Thank you for using CodeNexus!
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-yellow-300 font-semibold hover:text-yellow-100 transition"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
}

export default Logout;