import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/logout";


import AnalyticsCards from "../components/analytics/AnalyticsCards";
import LanguageChart from "../components/analytics/LanguageChart";
import PerformanceChart from "../components/analytics/PerformanceChart";
import PerformanceScore from "../components/analytics/PerformanceScore";
import AIInsights from "../components/analytics/AIInsights";
import RecentActivity from "../components/analytics/RecentActivity";

function CodeAnalyze() {

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = () => {

    fetch("http://127.0.0.1:8000/analytics")

        .then((res) => res.json())

        .then((data) => {

            setAnalytics(data);

            setLoading(false);

        })

        .catch((err) => {

            console.log(err);

            setLoading(false);

        });

    }
    const navigate = useNavigate();

    const handleLogout = () => {
      logout(navigate);
    };

      useEffect(() => {

        fetchAnalytics();

        const interval = setInterval(() => {

            fetchAnalytics();

        }, 10000);

        return () => clearInterval(interval);

    }, []);

      if (loading) {
        return (
          <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-3xl">
            Loading Analytics...
          </div>
        );
      }

  return (

    

    <div
      className="min-h-screen
      bg-gradient-to-br
      from-green-950
      via-green-900
      to-yellow-950
      text-white"
    >

      {/* Header */}
      <nav className="w-full border-b border-yellow-800/80">
        <div className="px-6 py-4 flex items-center justify-between">

          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-200">
              CodeNexus
            </h1>

            <p className="text-yellow-50/60 text-sm md:text-base mt-1">
              Code, Analyze & Optimize - all in one place!
            </p>
          </div>

          <div className="flex items-center gap-6 text-yellow-200 font-medium">

            <Link
              to="/dashboard"
              className="hover:text-yellow-100 transition"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="hover:text-yellow-100 transition"
            >
              Logout
            </button>

          </div>
        </div>
      </nav>

      {/* Existing Content */}
      <div className="px-8 py-8">

              
        <h1 className="text-6xl font-extrabold text-yellow-200 mb-10  text-center">
                CodeNexus Analytics
            </h1>

            {/* Welcome Banner */}

            <div className="
            bg-black/20
            backdrop-blur-md
            border
            border-yellow-700
            rounded-3xl
            p-10
            mb-12
            ">

                <h2 className="text-4xl font-bold text-yellow-200">
                    Welcome to CodeAnalyze
                </h2>

                <p className="text-yellow-100/70 mt-4 leading-8">
                    Monitor Code Generation, AI Review Quality,
                    Execution Success, Cache Performance and
                    Language Trends from one centralized dashboard.
                </p>

                {/* Add it here */}
                <p className="text-yellow-100/60 mt-4">
                    Last Updated: {new Date().toLocaleTimeString()}
                </p>

            </div>



      <AnalyticsCards analytics={analytics.summary} />
      <div className="grid grid-cols-2 gap-10 mt-12">

        {/* Pie Chart */}
        <LanguageChart analytics={analytics.summary} />

        {/* Bar Chart */}
        <PerformanceChart analytics={analytics.summary} />

        </div>
        <div className="mt-10">
            <PerformanceScore
                analytics={analytics.summary}
            />
        </div>

        <div className="mt-10">
            <AIInsights
                analytics={analytics.summary}
            />
        </div>

        <div className="mt-10">
            <RecentActivity
                activities={analytics.recent_activity}
            />
        </div>

            {/* Export Section */}

      <div className="mt-14 flex flex-col items-center">

          <h2 className="text-3xl font-bold text-yellow-200 mb-3">
              Export Analytics
          </h2>

          <p className="text-yellow-100/70 text-center mb-8 max-w-xl">
              Download the complete analytics report in CSV format for further
              analysis, reporting or documentation.
          </p>

          <a
              href="http://127.0.0.1:8000/analytics/export"
              className="
                  px-10
                  py-4
                  rounded-2xl
                  bg-yellow-600
                  hover:bg-yellow-500
                  text-green-950
                  font-bold
                  text-lg
                  shadow-xl
                  transition
                  hover:scale-105
              "
          >
              Download Analytics (.csv)
          </a>

      </div>
      </div>

    

    <footer className="mt-20 px-6 py-6 border-t border-yellow-800/80 text-center text-yellow-100/60 text-sm">
      Designed & Developed by
      <div className="text-yellow-100 font-bold mt-1">
        Hasini Golla
      </div>
      © 2026 CodeNexus. All rights reserved.
    </footer>
    

  </div> 

);

   

}

export default CodeAnalyze;