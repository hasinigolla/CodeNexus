{/*}
function PerformanceScore({ analytics }) {

  const score = Math.round(
    (
      analytics.compilation_rate +
      analytics.execution_rate +
      analytics.cache_hit_rate
    ) / 3
  );

  let status = "Needs Improvement";
  let color = "text-red-400";

  if (score >= 80) {
    status = "Excellent";
    color = "text-green-400";
  }
  else if (score >= 60) {
    status = "Good";
    color = "text-yellow-300";
  }
  else if (score >= 40) {
    status = "Average";
    color = "text-orange-400";
  }

  return (

    <div className="bg-black/20 backdrop-blur-md border border-yellow-600 rounded-3xl shadow-xl p-8">

      <h2 className="text-2xl font-bold text-yellow-300 mb-6">
        ⭐ Overall AI Performance
      </h2>

      <div className="flex flex-col items-center">

        <div className="w-44 h-44 rounded-full border-8 border-yellow-400 flex items-center justify-center">

          <span className="text-5xl font-bold text-white">

            {score}%

          </span>

        </div>

        <h2 className={`mt-6 text-3xl font-bold ${color}`}>
          {status}
        </h2>

      </div>

    </div>

  );

}

export default PerformanceScore;
*/}

function PerformanceScore({ analytics }) {

  const score = Math.round(
    (
      analytics.compilation_rate +
      analytics.execution_rate +
      analytics.cache_hit_rate
    ) / 3
  );

  let status = "Needs Improvement";
  let color = "text-red-400";
  let border = "border-red-500";
  let glow = "bg-red-500";

  if (score >= 80) {
    status = "Excellent";
    color = "text-green-400";
    border = "border-green-400";
    glow = "bg-green-400";
  }
  else if (score >= 60) {
    status = "Good";
    color = "text-yellow-300";
    border = "border-yellow-400";
    glow = "bg-yellow-400";
  }
  else if (score >= 40) {
    status = "Average";
    color = "text-orange-400";
    border = "border-orange-400";
    glow = "bg-orange-400";
  }

  return (

    <div className="relative overflow-hidden bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl shadow-2xl p-10">

      {/* Background Glow */}
      <div
        className={`absolute -top-16 -right-16 h-44 w-44 rounded-full blur-3xl opacity-15 ${glow}`}
      ></div>

      <div className="flex justify-between items-center mb-10">

        <div>

          <h2 className="text-3xl font-bold text-yellow-200">
            ⭐ Overall AI Performance
          </h2>

          <p className="text-yellow-100/60 mt-2">
            Combined score from Compilation, Execution & Cache metrics.
          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* Score Circle */}

        <div className="flex justify-center">

          <div
            className={`relative h-52 w-52 rounded-full border-8 ${border}
            flex items-center justify-center shadow-xl`}
          >

            <div className="text-center">

              <h1 className="text-6xl font-extrabold text-white">
                {score}
              </h1>

              <p className="text-yellow-100 text-lg">
                /100
              </p>

            </div>

          </div>

        </div>

        {/* Details */}

        <div>

          <h2 className={`text-4xl font-bold ${color}`}>
            {status}
          </h2>

          <div className="mt-8 space-y-5">

            <div>

              <div className="flex justify-between mb-1">
                <span className="text-yellow-100">
                  Compilation
                </span>

                <span className="text-yellow-300">
                  {analytics.compilation_rate}%
                </span>
              </div>

              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{
                    width: `${analytics.compilation_rate}%`,
                  }}
                />
              </div>

            </div>

            <div>

              <div className="flex justify-between mb-1">
                <span className="text-yellow-100">
                  Execution
                </span>

                <span className="text-green-400">
                  {analytics.execution_rate}%
                </span>
              </div>

              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{
                    width: `${analytics.execution_rate}%`,
                  }}
                />
              </div>

            </div>

            <div>

              <div className="flex justify-between mb-1">
                <span className="text-yellow-100">
                  Cache
                </span>

                <span className="text-cyan-400">
                  {analytics.cache_hit_rate}%
                </span>
              </div>

              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full"
                  style={{
                    width: `${analytics.cache_hit_rate}%`,
                  }}
                />
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default PerformanceScore;