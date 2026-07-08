import { Link } from "react-router-dom";

function History() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-yellow-950 text-white">
      <nav className="w-full border-b border-yellow-800/80">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-200">
              CodeNexus
            </h1>
            <p className="text-white-100/60 text-sm md:text-base mt-1">
              ~Code, Analyze & Optimize - all in one place!
            </p>
          </div>
          <div className="flex items-center gap-6 text-yellow-200 text-sm md:text-base font-medium">
            <Link to="/" className="hover:text-yellow-100 transition">
              Home
            </Link>
            <Link to="/history" className="hover:text-yellow-100 transition">
              History
            </Link>
            <Link to="/logout" className="hover:text-yellow-100 transition">
              Logout
            </Link>
          </div>
        </div>
      </nav>
      <section className="px-6 pt-12 pb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Your History
        </h1>
        <p className="text-yellow-50/70 text-lg md:text-xl max-w-3xl mx-auto leading-8">
          Here you can view your previous activities and interactions.
        </p>
      </section>
    </div>
  );
}

export default History;