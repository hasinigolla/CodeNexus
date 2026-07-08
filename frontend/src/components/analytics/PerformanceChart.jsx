{/*}
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend
} from "recharts";

function PerformanceChart({ analytics }) {

  const data = [

    {

      name: "Performance",

      Compilation: analytics.compilation_rate,

      Execution: analytics.execution_rate

    }

  ];

  return (

    <div className="bg-black/20 backdrop-blur-md border border-yellow-600 rounded-3xl shadow-xl p-6">

      <h2 className="text-2xl font-bold text-yellow-300 mb-5">

        📊 Compilation vs Execution

      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis dataKey="name"/>

          <YAxis/>

          <Tooltip/>

          <Legend/>

          <Bar dataKey="Compilation"/>

          <Bar dataKey="Execution"/>

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default PerformanceChart;
*/}

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Cell,
} from "recharts";

function PerformanceChart({ analytics }) {
  const data = [
    {
      name: "Compilation",
      value: analytics.compilation_rate,
    },
    {
      name: "Execution",
      value: analytics.execution_rate,
    },
  ];

  const COLORS = [
    "#FACC15", // Yellow
    "#22C55E", // Green
  ];

  return (
    <div className="relative overflow-hidden bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl shadow-2xl p-8">

      {/* Glow */}
      <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-green-500 opacity-10 blur-3xl"></div>

      <h2 className="text-3xl font-bold text-yellow-200 mb-8">
        📊 Performance Metrics
      </h2>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={data}
          barCategoryGap="35%"
        >
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#374151"
          />

          <XAxis
            dataKey="name"
            stroke="#FDE68A"
            tick={{ fill: "#FDE68A", fontSize: 14 }}
          />

          <YAxis
            domain={[0, 100]}
            stroke="#FDE68A"
            tick={{ fill: "#FDE68A", fontSize: 14 }}
          />

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #facc15",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Legend
            wrapperStyle={{
              color: "#fde68a",
            }}
          />

          <Bar
            dataKey="value"
            radius={[12, 12, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Footer */}

      <div className="mt-6 grid grid-cols-2 gap-6 border-t border-yellow-700/50 pt-5">

        <div className="text-center">
          <p className="text-yellow-100/70 text-sm">
            Compilation Success
          </p>

          <h3 className="text-3xl font-bold text-yellow-300 mt-2">
            {analytics.compilation_rate}%
          </h3>
        </div>

        <div className="text-center">
          <p className="text-yellow-100/70 text-sm">
            Execution Success
          </p>

          <h3 className="text-3xl font-bold text-green-400 mt-2">
            {analytics.execution_rate}%
          </h3>
        </div>

      </div>

    </div>
  );
}

export default PerformanceChart;