{/*}
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const COLORS = [
  "#FACC15",
  "#22C55E",
  "#3B82F6",
  "#EF4444",
  "#A855F7",
  "#06B6D4"
];

function LanguageChart({ analytics }) {

  const data = Object.entries(
    analytics.language_distribution
  ).map(([name, value]) => ({
    name,
    value
  }));

  return (

    <div className="bg-black/20 backdrop-blur-md border border-yellow-600 rounded-3xl shadow-xl p-6">

      <h2 className="text-2xl font-bold text-yellow-300 mb-5">
        🌍 Language Distribution
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}

export default LanguageChart;
*/}

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#FACC15", // Yellow
  "#22C55E", // Green
  "#3B82F6", // Blue
  "#EF4444", // Red
  "#A855F7", // Purple
  "#06B6D4", // Cyan
];

function LanguageChart({ analytics }) {
  const data = Object.entries(
    analytics.language_distribution
  ).map(([name, value]) => ({
    name,
    value,
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="relative overflow-hidden bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl shadow-2xl p-8">

      {/* Glow Effect */}
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-yellow-400 opacity-10 blur-3xl"></div>

      <h2 className="text-3xl font-bold text-yellow-200 mb-8">
        🌍 Language Distribution
      </h2>

      <ResponsiveContainer width="100%" height={380}>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={75}
            outerRadius={130}
            paddingAngle={4}
            stroke="#111827"
            strokeWidth={2}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

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
              paddingTop: "20px",
            }}
          />

        </PieChart>
      </ResponsiveContainer>

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center border-t border-yellow-700/50 pt-5">

        <div>
          <p className="text-sm text-yellow-100/60">
            Languages Used
          </p>

          <h3 className="text-3xl font-bold text-white">
            {data.length}
          </h3>
        </div>

        <div className="text-right">
          <p className="text-sm text-yellow-100/60">
            Total Requests
          </p>

          <h3 className="text-3xl font-bold text-green-400">
            {total}
          </h3>
        </div>

      </div>

    </div>
  );
}

export default LanguageChart;