{/*}
function RecentActivity({ activities }) {
  return (
    <div className="bg-black/20 backdrop-blur-md border border-yellow-600 rounded-3xl shadow-xl p-8">

      <h2 className="text-2xl font-bold text-yellow-300 mb-6">
        🕒 Recent Activity
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>

            <tr className="border-b border-yellow-700">

              <th className="pb-3">Feature</th>

              <th className="pb-3">Language</th>

              <th className="pb-3">Response</th>

              <th className="pb-3">Compiled</th>

              <th className="pb-3">Executed</th>

              <th className="pb-3">Cache</th>

              <th className="pb-3">Date</th>

            </tr>

          </thead>

          <tbody>

            {activities.map((item, index) => (

              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-black/30 transition"
              >

                <td className="py-4">{item.feature}</td>

                <td>{item.language}</td>

                <td>{item.response_time}s</td>

                <td>

                  {item.compiled ? "✅" : "❌"}

                </td>

                <td>

                  {item.executed ? "✅" : "❌"}

                </td>

                <td>

                  {item.cache_hit ? "✅" : "❌"}

                </td>

                <td>

                  {new Date(item.created_at).toLocaleString()}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentActivity;
*/}

function RecentActivity({ activities }) {
  return (
    <div className="bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl shadow-2xl p-8">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-yellow-200">
            🕒 Recent Activity
          </h2>

          <p className="text-yellow-100/60 mt-2">
            Last 10 AI operations performed in CodeNexus
          </p>
        </div>

        <span className="px-4 py-2 rounded-xl bg-green-900/40 border border-green-600 text-green-300 font-semibold">
          {activities.length} Records
        </span>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-yellow-700">

        <table className="w-full">

          <thead className="bg-yellow-600 text-green-950">

            <tr>
              <th className="px-5 py-4 text-left">Feature</th>
              <th className="px-5 py-4 text-left">Language</th>
              <th className="px-5 py-4 text-center">Response</th>
              <th className="px-5 py-4 text-center">Compiled</th>
              <th className="px-5 py-4 text-center">Executed</th>
              <th className="px-5 py-4 text-center">Cache</th>
              <th className="px-5 py-4 text-center">Date</th>
            </tr>

          </thead>

          <tbody>

            {activities.map((item, index) => (

              <tr
                key={index}
                className="border-b border-green-900 hover:bg-green-900/20 transition"
              >

                {/* Feature */}

                <td className="px-5 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      item.feature === "Code Review"
                        ? "bg-red-900/40 text-red-300 border border-red-500"
                        : "bg-green-900/40 text-green-300 border border-green-600"
                    }`}
                  >
                    {item.feature}
                  </span>

                </td>

                {/* Language */}

                <td className="px-5 py-4 font-semibold text-yellow-100">
                  {item.language}
                </td>

                {/* Response */}

                <td className="px-5 py-4 text-center text-yellow-200">
                  {item.response_time}s
                </td>

                {/* Compiled */}

                <td className="px-5 py-4 text-center">

                  {item.compiled === null ? (
                    <span className="text-gray-400">—</span>
                  ) : item.compiled ? (
                    <span className="text-green-400 text-xl">✓</span>
                  ) : (
                    <span className="text-red-400 text-xl">✗</span>
                  )}

                </td>

                {/* Executed */}

                <td className="px-5 py-4 text-center">

                  {item.executed === null ? (
                    <span className="text-gray-400">—</span>
                  ) : item.executed ? (
                    <span className="text-green-400 text-xl">✓</span>
                  ) : (
                    <span className="text-red-400 text-xl">✗</span>
                  )}

                </td>

                {/* Cache */}

                <td className="px-5 py-4 text-center">

                  {item.cache_hit ? (
                    <span className="text-green-400 text-xl">⚡</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}

                </td>

                {/* Date */}

                <td className="px-5 py-4 text-center text-yellow-50/70 text-sm">
                  {new Date(item.created_at).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentActivity;